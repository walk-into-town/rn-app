import React, { useEffect, useState } from 'react'
import { PinPoint, quizType, MakeCampaginStackParamList } from '@types'
import { makeCampaginNavigation } from '../../navigation/useNavigation'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'

import { ScrollWrapper } from '../../atoms/styled'
import perventGoBack from '../../util/perventGoBack'
import { $$ } from '../../util'
import MakePinPoint from '../../components/MakePinPointStack/MakePinPoint'
import MakeQuiz from '../../components/MakePinPointStack/MakeQuiz'
import SubmitPinPointButton from '../../components/MakePinPointStack/SubmitPinPointButton'

const MakePinPointStack = () => {
    const campaginNav = makeCampaginNavigation();
    const nav = useNavigation();

    const { params: { pinpoint, editIndex } } = useRoute<RouteProp<MakeCampaginStackParamList, 'MakePinPointStack'>>();

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState<number>(1.8);
    const [longitude, setLongitude] = useState<number>(19.9);
    const [description, setDescription] = useState("");
    const [pinPointImgs, setPinPointImgs] = useState<string[]>([]);

    const [quizText, setQuizText] = useState<string>("");
    const [type, setType] = useState<quizType>("주관식");
    const [choices, setChoices] = useState<string[]>([""]);
    const [answer, setAnswer] = useState<string>("");
    const [selectedAnswer, setSelectedAnswer] = useState("");

    useEffect(() => {
        if (pinpoint === undefined) return;

        if (editIndex !== undefined) nav.setOptions({ headerTitle: "핀포인트 수정하기" })

        setName(pinpoint.name);
        setLatitude(pinpoint.latitude);
        setLongitude(pinpoint.longitude);
        setDescription(pinpoint.description);

        setQuizText(pinpoint.quiz.text);
        setType(pinpoint.quiz.type);
        setChoices(pinpoint.quiz.choices);
        if (pinpoint.quiz.type === '주관식')
            setAnswer(pinpoint.quiz.answer);
        else
            setSelectedAnswer(pinpoint.quiz.answer);

    }, [pinpoint])

    // 핀포인트 업로드
    const getPinpoint: () => PinPoint = () => {
        return {
            name,
            imgs: pinPointImgs,
            latitude,
            longitude,
            description,

            quiz: {
                text: quizText,
                type: type,
                choices,
                answer: type === '주관식' ? answer : selectedAnswer,
            }
        }
    }
    const onSubmit = async () => {
        const pinpoint: PinPoint = getPinpoint();
        campaginNav.navigate('MakeCampaginStack', { pinpoint, editIndex });
    }

    const hasUnsavedChanges = Boolean(pinpoint ? $$.isEditPinPoint(pinpoint, getPinpoint())
        : name || pinPointImgs.length || description || quizText || answer);
    perventGoBack({ hasUnsavedChanges })

    return (
        <ScrollWrapper>
            <MakePinPoint
                useName={[name, setName]}
                useLatitude={[latitude, setLatitude]}
                useLongitude={[longitude, setLongitude]}
                usePinPointImgs={[pinPointImgs, setPinPointImgs]}
                useDescription={[description, setDescription]}
            />

            <MakeQuiz
                useQuizText={[quizText, setQuizText]}
                useType={[type, setType]}
                useChoices={[choices, setChoices]}
                useAnswer={[answer, setAnswer]}
                useSelectedAnswer={[selectedAnswer, setSelectedAnswer]}
            />

            <SubmitPinPointButton onSubmit={onSubmit} />
        </ScrollWrapper>
    )
}

export default MakePinPointStack;