import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { BtsWrapper, Container } from '../../atoms/elements/layouts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons, Title } from '../../atoms';
import { ListItem } from 'react-native-elements';


interface Props {

}

const dummy = [
    {
        name: '하하하하',
        region: '구미시'
    },
    {
        name: '금오공대 탐방',
        region: '구미시'
    },
    {
        name: '멋진 캠페인',
        region: '제주시'
    },
    {
        name: '맛집 탐방',
        region: '서울특별시'
    },
    {
        name: '맛집 탐방',
        region: '서울특별시'
    },
    
]

const PlayingCampaignModal = (props: Props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [playingCampaignList, setPlayingCampaignList] = useState(dummy);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const showCampaignList = () => {
        setModalVisible(true);
    }

    return (
        <Container>
            <View>
                <TouchableOpacity activeOpacity={0.7} onPress={showCampaignList}>
                    <Ionicons name="airplane-sharp" size={40} color="#00c3ff" />
                </TouchableOpacity>
            </View>


            <Modal
                isVisible={isModalVisible}
                animationIn="zoomIn"
                animationOut="fadeOut"
                backdropOpacity={0.5}
            >

                <View style={styles.modalContainer}>
                    <Title style={{ marginTop: 10 }}>참여중인 캠페인 목록</Title>


                    <ScrollView style={{ marginTop: 10 }}>
                        {
                            playingCampaignList.map((campaign, idx)=>
                                <ListItem key={idx}>
                                    <ListItem.Content>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{campaign.name}</Text>
                                        <Text>{campaign.region}</Text>
                                    </ListItem.Content>
                                </ListItem>
                            )
                        }

                    </ScrollView>


                </View>


                <TouchableOpacity onPress={toggleModal} style={{ alignSelf: 'center', marginTop: 20 }}>
                    <FontAwesome name="close" color={"#FFF"} size={40} />
                </TouchableOpacity>





            </Modal>
        </Container>

    )

}


export default PlayingCampaignModal;

const styles = StyleSheet.create({
    modalContainer: {
        width: '80%',
        height: '70%',
        marginTop: 80,
        alignSelf: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    }
})
