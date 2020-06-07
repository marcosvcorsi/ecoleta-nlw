import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Select, { Item } from 'react-native-picker-select';
import ibge from '../../services/ibge';

import {
  Container,
  Main,
  Title,
  Description,
  Button,
  ButtonIcon,
  ButtonText,
} from './styles';

interface IBGEUfResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<Item[]>([]);
  const [cities, setCities] = useState<Item[]>([]);

  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    ibge.get<IBGEUfResponse[]>('/v1/localidades/estados').then((response) => {
      const ufInitials = response.data
        .map((uf) => {
          return {
            label: uf.sigla,
            value: uf.sigla,
          };
        })
        .sort((a, b) => {
          if (a.value > b.value) {
            return 1;
          }
          if (a.value < b.value) {
            return -1;
          }

          return 0;
        });

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (uf) {
      ibge
        .get<IBGECityResponse[]>(`/v1/localidades/estados/${uf}/municipios`)
        .then((response) => {
          const citiesNames = response.data.map((city) => {
            return { label: city.nome, value: city.nome };
          });

          setCities(citiesNames);
        });
    }
  }, [uf]);

  const handleNavigateToPoints = useCallback(() => {
    navigation.navigate('Points', {
      uf,
      city,
    });
  }, [uf, city]);

  return (
    <Container
      source={require('../../assets/home-background.png')}
      imageStyle={{
        width: 274,
        height: 368,
      }}
    >
      <Main>
        <Image source={require('../../assets/logo.png')} />

        <View>
          <Title>Seu marketplace de coleta de resíduos</Title>
          <Description>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
          </Description>
        </View>
      </Main>

      <View>
        <Select
          onValueChange={(value) => setUf(value)}
          items={ufs}
          placeholder={{ label: 'Selecione sua UF' }}
          style={{
            viewContainer: styles.select,
            placeholder: styles.selectText,
          }}
        />

        <Select
          onValueChange={(value) => setCity(value)}
          items={cities}
          placeholder={{ label: 'Selecione sua Cidade' }}
          style={{
            viewContainer: styles.select,
            placeholder: styles.selectText,
          }}
        />

        <Button onPress={handleNavigateToPoints}>
          <ButtonIcon>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </ButtonIcon>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  select: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  selectText: {
    fontSize: 16,
  },
});

export default Home;
