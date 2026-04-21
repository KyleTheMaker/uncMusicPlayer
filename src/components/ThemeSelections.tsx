/**
 * Provides users a way to choose how they control the Audio Player
 */
import { Text, View } from "react-native";
import { useThemeStyles } from "@/context/ThemeContext";
import { Picker } from "@react-native-picker/picker";


export const ThemeStyleSelections = () => {
    const {themeStyle, setThemeStyle} = useThemeStyles();

    const getSelectedTheme = () => {
        if(themeStyle.light) return "light";
        if(themeStyle.dark) return "dark";
        if(themeStyle.sysDefault) return "sysDefault";
    }

    const handleValueChange = (itemValue: string) => {
        if(itemValue === "light"){
            setThemeStyle({light: true, dark: false, sysDefault: false});
        }else if(itemValue === "dark"){
            setThemeStyle({light: false, dark: true, sysDefault: false});
        }else if(itemValue === "sysDefault"){
            setThemeStyle({light: false, dark: false, sysDefault: true});
        }
    }

    return (
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{flex:1, fontSize:16,}}> Media Controls </Text>
            <Picker
                selectedValue={getSelectedTheme()}
                style={{color:"black", flex: 1}}
                dropdownIconColor={"black"}
                onValueChange={handleValueChange}>
                <Picker.Item label="Light" value="light" />
                <Picker.Item label="Dark" value="dark" />
                <Picker.Item label="Device Default" value="sysDefault" />
            </Picker>
        </View>
    );
}