import React from 'react'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native'
import style from './style'
import Logo from  '../../assets/logo.png'
import * as MailCompose from 'expo-mail-composer'


export default function Detail(){
    const navigation = useNavigation()
    const route = useRoute()
    const incidents = route.params.incidents
    const message = `Olá ${incidents.name}, estou entrando em contato pois gostaria de ajudar no caso "${incidents.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}`
    function navigateToDetail(){
        navigation.goBack()
    }
    
    function sendMail(){
        MailCompose.composeAsync({
            subject: `Herói do caso: ${incidents.title}`,
            recipients: [incidents.email],
            body: message
        })
    }
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incidents.whatsapp}&text=${message}`)
    }

    return(
    <View style = {style.container}>
         <View style = {style.header}>
            <Image source = {Logo}/>
            <TouchableOpacity onPress={navigateToDetail}>
                <Feather name = 'arrow-left' size ={28} color = '#E82041'/>
            </TouchableOpacity>
        </View> 

        <View style ={style.incident}>
        <Text style={[style.incidentsProperty,{marginTop:0}]}>ONG:</Text>
        <Text style={style.incidentsValue}>{incidents.name} de {incidents.city}/{incidents.uf}</Text>

                <Text style={style.incidentsProperty}>Caso:</Text>
                <Text style={style.incidentsValue}>{incidents.title}</Text>

                <Text style={style.incidentsProperty}>VALOR:</Text>
                <Text style={style.incidentsValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}</Text>
        </View>

        <View style={style.contactBox}>
            <Text style={style.heroTitle}>Salve o dia</Text>
            <Text style={style.heroTitle}>Seja o Heroi desse caso</Text>
            <Text style={style.heroDescription}>Entre em contato: </Text>

            <View style={style.actions}>
                <TouchableOpacity style ={style.action}
                    onPress = {sendWhatsapp}
                >
                    <Text style={style.actionText}>Whatsapp</Text>
                </TouchableOpacity>

                <TouchableOpacity style ={style.action}
                    onPress = {sendMail}
                >
                    <Text style={style.actionText}>E-mail</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
}