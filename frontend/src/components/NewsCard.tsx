import { BugPlay } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface NewsCardProps {
    image: string;
    date: string;
    title: string;
    description: string;
}

export default function NewsCard({ image, date, title, description }: NewsCardProps) {
    return (

        <Card className="m-4 w-full ">
            <img src={image} alt={title} className="w-full h-48 object-cover p-0" />
            <CardContent>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{date}</CardDescription>
                </CardHeader>
                <p className="mt-2 p-5">{description}</p>
                <Button className="p-5">ดูข้อมูลเพิ่มเติม</Button>
            </CardContent>
        </Card>
    )

};