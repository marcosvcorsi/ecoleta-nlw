import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, Linking } from 'react-native';

import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';

import {
  Container,
  PointImage,
  PointName,
  PointItems,
  Button,
  ButtonText,
  Address,
  AddressTitle,
  AddressContent,
  Footer,
} from './styles';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  const [data, setData] = useState<Data>({} as Data);

  useEffect(() => {
    api.get(`/points/${routeParams.point_id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleComposeMail = useCallback(() => {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  }, [data]);

  const handleWhatsApp = useCallback(() => {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`
    );
  }, [data]);

  if (!data.point) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <PointImage
          source={{
            uri: data.point.image_url,
          }}
        />

        <PointName>{data.point.name}</PointName>
        <PointItems>
          {data.items.map((item) => item.title).join(', ')}
        </PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>
            {data.point.city}, {data.point.uf}
          </AddressContent>
        </Address>
      </Container>

      <Footer>
        <Button onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <ButtonText>WhatsApp</ButtonText>
        </Button>

        <Button onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#FFF" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </SafeAreaView>
  );
};

export default Detail;
