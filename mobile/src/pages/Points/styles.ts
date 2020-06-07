import styled from 'styled-components/native';
import Constants from 'expo-constants';
import MapView, { Marker as MarkerNative } from 'react-native-maps';

export const Container = styled.View`
  flex: 1;
  padding: ${20 + Constants.statusBarHeight}px 32px 0 32px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Ubuntu_700Bold';
  margin-top: 24px;
`;

export const Description = styled.Text`
  color: #6c6c80;
  font-size: 16px;
  margin-top: 4px;
  font-family: 'Roboto_400Regular';
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const Marker = styled(MarkerNative)`
  width: 90px;
  height: 80px;
`;

export const MarkerContainer = styled.View`
  width: 90px;
  height: 70px;
  background-color: #34cb79;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`;

export const MarkerImage = styled.Image`
  width: 90px;
  height: 45px;
  resize-mode: cover;
`;

export const MarkerTitle = styled.Text`
  flex: 1;
  font-family: 'Roboto_400Regular';
  color: #fff;
  font-size: 13px;
  line-height: 23px;
`;

export const ItemsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 32px;
`;

interface ItemProps {
  selected?: boolean;
}

export const Item = styled.TouchableOpacity<ItemProps>`
  background-color: #fff;
  border-width: 2px;
  border-color: ${(props) => (props.selected ? '#34CB79' : '#eee')};
  height: 120px;
  width: 120px;
  border-radius: 8px;
  padding: 20px 16px 16px 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

export const ItemTitle = styled.Text`
  font-family: 'Roboto_400Regular';
  text-align: center;
  font-size: 13px;
`;
