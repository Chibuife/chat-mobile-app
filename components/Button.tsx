import { StyleSheet, View, Pressable, Text, useWindowDimensions } from 'react-native';

export default function Button({ label, marginHorizontal, major, func, bgcolor, txcolor, width, textSize, height, borderRadis, borderColor,borderWidth }: { borderWidth?:number,borderColor?:string, marginHorizontal?: any, label: any, major: boolean, func: Function, bgcolor: string, txcolor?: string, width?: any, textSize?: number, height?: number, borderRadis?: number }) {
    const windowswidth = useWindowDimensions()
    console.log(marginHorizontal,'kkk')
    return (
        major ?
            <View
                style={[styles.buttonContainer, {marginHorizontal: marginHorizontal ? marginHorizontal : "auto" , width: width ? width : windowswidth.width - 50, height: height ? height : 50, }]}
            >
                <Pressable
                    style={[styles.button, { backgroundColor: bgcolor ? bgcolor : "#fff", borderRadius: borderRadis ? borderRadis : 20, borderColor,borderWidth}]}
                    onPress={() => func()}
                >
                    <Text style={[styles.buttonLabel, { color: txcolor ? txcolor : "#25292e", fontSize: textSize ? textSize : 16 }]}>{label}</Text>
                </Pressable>
            </View> :
            <View style={[{ 
                marginHorizontal: marginHorizontal ? marginHorizontal : "auto",borderColor,borderWidth
            },styles.buttonContainer ]}>
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
