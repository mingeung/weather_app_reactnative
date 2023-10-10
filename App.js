import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
//ionicons import하기
import { Ionicons } from "@expo/vector-icons";

//상단 바 스타일 바꾸기 위해 import
import { StatusBar } from "expo-status-bar";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "d638d0852afe01f0466a5902f5870911";
//icons.expo.fyi 어떤 아이콘이 있는지 확인할 수 있다.
const icons = {
  //key는 날씨 데이터가 띄워주는 이름, value는 아이콘 이름
  //가능한 모든 날씨를 가져와야 한다.
  Clouds: "cloudy",
  Clear: "sun",
  Snow: "snow",
  Rain: "rain",
  Drizzle: "rains",
  Tunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();

    setDays(json);
  };

  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      {/* StatusBar스타일 밝게 */}
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}> {city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          // 스타일 합치기. 밑에 있는 styleSheet에 있는 것과 지금 입력한 내용 합치기
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          <View style={styles.day}>
            {/* 방향을 row로 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.temp}>
                {parseFloat(days.main.temp).toFixed(1)}
              </Text>
              {/* icon 넣기. 사이트에서 복사하면 된다. */}
              <Ionicons
                // 날씨의 이름을 넣기
                name={icons[days.weather[0].main]}
                size={68}
                color="white"
              />
            </View>

            <Text style={styles.description}>{days.weather[0].main}</Text>
            <Text style={styles.tinyText}>{days.weather[0].description}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 100,
    color: "white",
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  tinyText: {
    fontSize: 25,
    marginTop: -5,
    color: "white",
    fontWeight: "500",
  },
});
