import React, { useState } from 'react'

import { useAuthContext } from '../../util/Auth';
import { Button, Input, Text } from 'react-native-elements'
import { View } from 'react-native';
import { BtsWrapper } from '../../atoms/styled';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { ClearButton } from '../../atoms';
import Register from './Register';


interface Props {

}

const LoginForm = ({ }: Props) => {
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")

    const onClick = () => {
        console.log(id, pw)
    }
    const { useAuth: { signIn } } = useAuthContext();

    const tmpColor = "#517fa4";

    return (
        <View style={{marginTop: '30%'}}>
            <Input
                onChangeText={(text: string) => setId(text)}
                inputStyle={{textAlign: "center"}}
            />

            <Input
                onChangeText={(text: string) => setPw(text)}
                errorMessage='ENTER A VALID ERROR HERE'
                errorStyle={{ color: '#517fa4', textAlign: "center" }}
                secureTextEntry={true}
                inputStyle={{textAlign: "center"}}
            />

            <BtsWrapper>
                <Register />
                <ClearButton title="로그인" onPress={() => signIn({id, pw})}/>
            </BtsWrapper>

            <BtsWrapper>
                <EvilIcons name="sc-telegram" color={tmpColor} size={50} onPress={() => signIn({ id, pw })} />
                <EvilIcons name="sc-github" color={tmpColor} size={50} onPress={onClick} />
                <EvilIcons name="sc-facebook" color={tmpColor} size={50} onPress={onClick} />
                <EvilIcons name="sc-google-plus" color={tmpColor} size={50} onPress={onClick} />
            </BtsWrapper>
        </View>
    )
}

export default LoginForm;