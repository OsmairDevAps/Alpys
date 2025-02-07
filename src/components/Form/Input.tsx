import { forwardRef } from "react";
import { TextInput, View, TextInputProps, Text } from "react-native";
import { Controller, Control, FieldError, UseControllerProps } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import clsx from "clsx";

type Props = {
  icon?: keyof typeof Feather.glyphMap;
  control: Control<any>;
  formProps: UseControllerProps;
  inputProps: TextInputProps;
  error?: string | undefined;
}

const Input = forwardRef<TextInput, Props> (({ icon, formProps, control, inputProps, error='' }:Props, ref) => {
  return (
    <Controller 
      control={control}
      render = {({ field }) => (
        <View className="w-full mb-4">
          <View className="flex-row items-center text-orange-950 bg-orange-50 border-[1px] border-orange-500 rounded-lg">
            {icon &&
              <View className="p-4 justify-center items-center border-r-[1px] border-orange-500">
                <Feather 
                  name={icon} 
                  size={24} 
                  color={clsx({
                    ['#fa6031']: error.length > 0,
                    ['#4e2d01']: (error.length === 0 && field.value),
                    ['#c4c4c4']: (!field.value && error.length === 0),
                  })}
                />
              </View>
            }
            <TextInput
              {...inputProps} 
              value={field.value}
              onChangeText={field.onChange}
              ref={ref}
              className="flex-1 pl-4 w-full text-alpys-tx-input text-lg"
              placeholderTextColor='#c4c4c4'
            />
          </View>
          { error && <Text className="text-md text-red-500 mt-2">{error}</Text> }
        </View>
      )}
      {...formProps}
    />
  )
})

export default Input