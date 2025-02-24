import { View, Text } from "react-native";
import { Picker, PickerProps } from '@react-native-picker/picker'

type SelectProps = {
  label: string;
  value: string;
}

type Props = {
  arrayList: SelectProps[];
  inputProps: PickerProps;
  error?: string;
}

const Select = ({ arrayList, inputProps, error='' }: Props) => {
  return (
    <View className="w-full mb-4">
      <View className="text-orange-950 bg-orange-50 border-[1px] border-orange-500 w-full h-16 rounded-lg">
        <Picker 
          className='bg-slate-100'
          {...inputProps}
        >
          <Picker.Item 
            label="Selecione" 
            value='' 
            color="#adacac" 
          />
          {arrayList.map(item => (
            <Picker.Item 
              key={item.value}
              label={item.label} 
              value={item.value} 
            />
          ))}
        </Picker>
      </View>
    </View>
  )
}

export default Select