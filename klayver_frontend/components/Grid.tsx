import React from "react";
import { View, Text } from "react-native";
import { truncateTextWithEllipsis } from "../utils/truncateText";

interface GridProps {
  data: any[];
}
export const GridTable: React.FC<GridProps> = ({ data }) => {
  return (
    <View className="grid grid-rows-3 grid-cols-2 gap-y-4 bg-[#fff] rounded-[20px] my-5">
      {data.map((item: any) => (
        <View
          key={item.id}
          className="row-start-2 col-start-1 row-span-1 col-span-2 border-b border-gray-100 p-4 flex flex-row justify-between"
        >
          <Text className="text-[#828282] font-semibold text-[18px]">
            {item.title}
          </Text>

         
          {item.value ?
            <Text className="text-[18px] font-semilight">
              {truncateTextWithEllipsis(item.value, 20)}
            </Text>
            :
            item.currency
            
}
        </View>
      ))}
    </View>
  );
};
