import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, View, Pressable, Text, useWindowDimensions } from 'react-native';

export default function Button({ label, marginHorizontal, borderColorLight, borderColorDark, major, func, bgcolor, txcolor, width, textSize, height, borderRadius, borderColor, borderWidth }: { borderColorLight?: string, borderColorDark?: string, borderWidth?: number, borderColor?: string, marginHorizontal?: any, label: any, major: boolean, func: Function, bgcolor: string, txcolor?: string, width?: any, textSize?: number, height?: number, borderRadius?: number }) {
    const windowswidth = useWindowDimensions()
    const bordercolor = useThemeColor({ light: borderColorLight, dark: borderColorDark }, 'borderColor');

    return (
        major ?
            <View
                style={[styles.buttonContainer, { marginHorizontal: marginHorizontal ? marginHorizontal : "auto", width: width ? width : windowswidth.width - 50, height: height ? height : 50, }]}
            >
                <Pressable
                    style={[styles.button, { backgroundColor: bgcolor ? bgcolor : "#fff", borderRadius: borderRadius ? borderRadius : 20, borderColor: borderColor ? borderColor : bordercolor, borderWidth }]}
                    onPress={() => func()}
                >
                    <Text style={[styles.buttonLabel, { color: txcolor ? txcolor : "#25292e", fontSize: textSize ? textSize : 16 }]}>{label}</Text>
                </Pressable>
            </View> :
            <View style={[{
                // marginHorizontal: marginHorizontal ? marginHorizontal : "auto", 
                width:'40%',
                                borderColor, borderWidth
            }, styles.buttonContainer]}>
                <Pressable style={styles.button} onPress={() => func()}>
                    <Text style={styles.buttonLabel}>{label}</Text>
                </Pressable>
            </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        // backgroundColor:'red'
    },
    button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
});
