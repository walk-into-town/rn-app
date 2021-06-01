import { IAuthContext, AuthReduce, UseAuth } from "@types";
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { API } from "../api";
import { getStorage, setStorage, rmStorage } from "../util/AsyncStorage";
import { useLoadingContext } from "./Loading";

const AuthContext = createContext<IAuthContext | null>(null);

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('Cannot find AuthContext');

    return context;
}

const AuthContextProvider = ({ children }: { children: JSX.Element }) => {

    const { useLoading: { startLoading, endLoading } } = useLoadingContext();

    const reduce: AuthReduce = (_, action) => {
        switch (action.type) {
            case 'SIGN_IN':
                return {
                    userToken: action.userToken,
                };
            case 'SIGN_OUT':
            case 'RESTORE_TOKEN':
                return {
                    userToken: undefined,
                };
            case "EDIT":
                return {
                    userToken: action.userToken
                }
        }
    }
    const [auth, dispatch] = useReducer(reduce, {
        userToken: undefined,
    });

    useEffect(() => {
        const bootAsync = async () => {
            const loginData = await getStorage("userToken")
            console.log("AsyncStorage Login Data", loginData)

            if (loginData === null)
                dispatch({ type: 'RESTORE_TOKEN' })
            else
                useAuth.signIn(loginData);
        };

        bootAsync();
    }, []);

    const useAuth: UseAuth = useMemo(() => ({
        signIn: async ({ id, pw }) => {
            startLoading();

            console.log("[로그인 시도]", id, pw)
            const { result, error, errdesc, data, session } = await API.memberLogin({ id, pw });
            dispatch({ type: "RESTORE_TOKEN" });

            if (result === "failed" || data === undefined) {
                await rmStorage("userToken");
                console.log("[로그인 실패]", error, errdesc)
            }
            else {
                const { nickname, profileImg, selfIntroduction } = data;
                await setStorage("userToken", { id, pw });
                dispatch({ type: 'SIGN_IN', userToken: { id, nickname, profileImg, selfIntroduction } });
                console.log("[로그인 성공]", session)
            }
            endLoading();
            return errdesc ? errdesc : "";

            // dispatch({ type: 'SIGN_IN', userToken: { id, nickname: "닉네임", profileImg: "", seflIntruduction: "아무노래나 틀어" } });
            // endLoading();
            // return "";
        },
        signOut: ({ id }) => {
            const init = async () => {
                startLoading();

                const { result, error, session } = await API.memberLogout({ id });
                if (result === 'failed')
                    console.log("[로그아웃 에러]", error)
                else {
                    dispatch({ type: 'SIGN_OUT' });
                    await rmStorage("userToken");
                    console.log("[로그아웃]", session);
                }

                endLoading();
            }
            init();
        },
        onEdit: ({ nickname, profileImg, selfIntroduction }) => {
            if (auth.userToken === undefined)
                return;

            const id = auth.userToken.id;
            dispatch({ type: 'EDIT', userToken: { id, nickname, profileImg, selfIntroduction } })
        }
    }), []);

    return (
        <AuthContext.Provider value={{ auth, useAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, useAuthContext, AuthContextProvider }