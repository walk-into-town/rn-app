
import { MakePinPoint, PinPoint, TuseState } from '@types'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { Box, Row, SubTitle, EvilIcons, OutLineButton, SimpleSwapListItem, colorCode, ClearButton } from '../../atoms'

interface Props {
    useRegion: TuseState<string>,
    pinPointList: MakePinPoint[],
    setCampaignRegion: () => void,
    navToPinPointModal: (item?: MakePinPoint, idx?: number) => void,
    deletePinPoint: (idx: number) => void
}

const PinPointListBox = ({ useRegion, pinPointList, setCampaignRegion, navToPinPointModal, deletePinPoint }: Props) => {

    const [region, setRegion] = useRegion

    return (
        <Box>
            <Text style={{ color: colorCode.gray }}>* 리스트를 옆으로 스왑하면 삭제할 수 있습니다.</Text>
            <Row>
                <ClearButton
                    title="지역 설정"
                    onPress={() => setCampaignRegion()}
                />


                <Text> {region} </Text>

            </Row>
            <Row>
                <SubTitle>핀포인트 리스트</SubTitle>
                <Button type="clear" titleStyle={{ fontSize: 13, color: "black" }}
                    title="지도에서 보기"
                    onPress={() => console.log("지도에서 보기")}
                />
            </Row>
            {
                pinPointList.map((item, idx) =>
                    <SimpleSwapListItem
                        key={idx}
                        text={item.name}
                        onText={() => navToPinPointModal(item, idx)}
                        onDelete={() => deletePinPoint(idx)}
                    />
                )
            }
            <OutLineButton
                title="핀포인트 추가"
                onPress={() => navToPinPointModal()}
                style={{ marginTop: 10 }}
            />
        </Box>
    )
}

export default PinPointListBox;
