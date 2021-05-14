import { SearchCampaign } from '@types'
import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import { OutLineButton, Title } from '../../atoms'
import { toCommonDate } from '../../util'

interface Props {
    campagin: SearchCampaign
}

const ProfileCard = ({ campagin }: Props) => {
    return (
        <Card containerStyle={{ marginBottom: 20 }}>
            <Title>{campagin.name}</Title>
            <Text>{toCommonDate(campagin.updateTime)}</Text>
            <Text>{campagin.description}</Text>
            <Text>{campagin.region}</Text>

            <OutLineButton title="캠페인 참여하기" style={{ marginTop: 10 }} />
        </Card>
    )
}

export default ProfileCard
