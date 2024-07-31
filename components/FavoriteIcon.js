import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function FavoriteIcon({ onPress, color }) {
  const [favorite, setFavorite] = useState(false);

  const handlePress = () => {
    setFavorite(!favorite);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialIcons
        name={favorite ? 'favorite' : 'favorite-border'}
        size={24}
        color={favorite ? 'red' : color || 'grey'}
      />
    </TouchableOpacity>
  );
}
