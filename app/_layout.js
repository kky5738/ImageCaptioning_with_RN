import { Stack } from "expo-router";
import {useFonts} from "expo-font"

export const unstable_settings = {
    initialRouteName: "ImageCaption",
};

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf")
    })
    if (!fontsLoaded) { return null}

    return (
        <Stack initialRouteName="ImageCaption">
            <Stack.Screen name="ImageCaption"/>
        </Stack>
    )
}

export default Layout;