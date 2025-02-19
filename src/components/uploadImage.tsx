import { supabase } from '../database/supabase';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const pickImage = async (): Promise<string | null> => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri; 
  }
  return null;
};

const uploadImageToSupabase = async (imageUri: string, productId: string): Promise<string | null> => {
  try {
    if (!imageUri) {
      throw new Error('Nenhuma imagem selecionada!');
    }

    const fileExt = imageUri.split('.').pop();
    const fileName = `${productId}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const fileData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: 'base64'
    });

    const { data, error } = await supabase
      .storage
      .from('Bucket_fotos')
      .upload(filePath, decodeURI(fileData), { contentType:'image/png' });

    if (error) throw error;

    const { data: publicUrlData } = supabase
      .storage
      .from('Bucket_fotos')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    throw error
  }
};

export { pickImage, uploadImageToSupabase };