import { View, Text } from "react-native";
import { Control, Controller, UseControllerProps } from "react-hook-form";
import { Picker } from '@react-native-picker/picker'

type SelectProps = {
  label: string;
  value: string;
}

type Props = {
  control: Control<any>;
  formProps: UseControllerProps;
  arrayList: SelectProps[];
  error?: string;
}

const Select = ({ formProps, control, arrayList, error='' }: Props) => {
  return (
    <Controller
       control={control}
       render={({ field }) => (
        <View className="w-full mb-4">
           <View className="text-orange-950 bg-orange-50 border-[1px] border-orange-500 w-full h-16 rounded-lg">
            <Picker 
              className='bg-slate-100'
              selectedValue={field.value}
              onValueChange={field.onChange}
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
          { error && <Text className="text-md text-red-500 mt-2">{error}</Text> }
        </View>
      )}
      {...formProps}
    />
  )
}

export default Select