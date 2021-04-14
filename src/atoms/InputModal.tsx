import React, { useState } from 'react'
import { StyleProp, TextStyle, View } from 'react-native'
import { Input, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { FontAwesome } from '.';
import { BtsWrapper } from './styled';

interface Props {
    useText: [string, React.Dispatch<React.SetStateAction<string>>],
    placeholder?: string,
    type?: "input" | "textarea"
}
interface styleInterface {
    text: StyleProp<TextStyle>,
    input: StyleProp<TextStyle>
}
const inputStyle: styleInterface = {
    text: { fontSize: 20, fontFamily: "SCDream8", alignSelf: "center", marginVertical: 30 },
    input: { color: "#FFF", fontSize: 30, fontFamily: "SCDream6" }
}
const textareaStyle: styleInterface = {
    text: { height: 100, fontSize: 13, fontFamily: "SCDream5", marginHorizontal: 7 },
    input: { color: "#FFF", height: 200, fontSize: 20, fontFamily: "SCDream5" }
}

const InputModal = ({ useText, placeholder, type = "input" }: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [text, setText] = useText;
    const [input, setInput] = useState(text);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const openModal = () => {
        setInput(text);
        toggleModal();
    }
    const onSubmit = () => {
        setText(input);
        toggleModal();
    }

    return (
        <View>
            <TouchableOpacity onPress={openModal}>
                <Text style={type === "input" ? inputStyle.text : textareaStyle.text}>
                    {text || placeholder || "제목명을 입력해주세요"}
                </Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} animationOutTiming={5} avoidKeyboard>
                <Input
                    autoFocus
                    selectionColor={"#FFF"} style={type === "input" ? inputStyle.input : textareaStyle.input}
                    value={input}
                    onChangeText={(text: string) => setInput(text)}
                    multiline={type === "textarea"}
                    onEndEditing={() => {
                        if(type==='input') onSubmit();
                    }}
                />

                <BtsWrapper>
                    <TouchableOpacity onPress={toggleModal} style={{ marginRight: 20 }}>
                        <FontAwesome name="close" color={"#FFF"} size={40} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onSubmit}>
                        <FontAwesome name="check" color={"#FFF"} size={40} />
                    </TouchableOpacity>
                </BtsWrapper>
            </Modal>
        </View>
    )
}

export default InputModal;
