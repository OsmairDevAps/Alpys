import { forwardRef } from "react";
import { View, Text } from "react-native";
import { Controller, UseControllerProps } from "react-hook-form";
import { Picker } from '@react-native-picker/picker'

type SelectProps = {
  label: string;
  value: string;
}

type Props = {
  formProps: UseControllerProps;
  arrayList: SelectProps[];
  error?: string;
}

const Select = ({ formProps, arrayList, error }: Props) => {
  return (
    <Controller
       render={({ field }) => (
        <View className="w-full mb-4">
           <View className="text-orange-950 bg-orange-50 border-[1px] border-orange-500 rounded-lg">
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