import type { IconType } from "react-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CardWidgetOne{
    Icon:IconType,
    title:string,
    listItems:string[]
}

export function CardWidgetOne({Icon, title, listItems }:CardWidgetOne){
    return(
        <Card className="bg-[#D8DFE5] py-[10px] cursor-pointer">
             <CardHeader className="flex flex-row gap-x-[6px] items-center py-[1px] px-[10px]">
                <Button className="w-[40px] h-[40px] rounded-[50%] bg-[#53637D]"><Icon className="teext-[18px]"/></Button>
                <CardTitle className="text-[#0f2a3f]">{title}</CardTitle>
            </CardHeader>
            <CardContent className="px-[10px] mt-[10px]">
                <ul className="list-disc list-inside">
                    {listItems && listItems.length > 0 && listItems.map((list, index) => (
                        <li key={index} className="text-[12px]">{list}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}