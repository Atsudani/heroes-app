import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { PropsWithChildren } from "react";
// import type { JSX } from "react";

interface Props extends PropsWithChildren {
  title: string;
  icon: React.ReactNode; //JSX.Element tambien puede ser!..
}
export const HeroStatCard = ({ title, icon, children }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {
          /* //! Comentado porque estoy voy a recibirlo como un children.
                <div className="text-lg font-bold">Batman</div>
                <p className="text-xs text-muted-foreground">Intelligence: 10/10</p> 
            */
          children
        }
      </CardContent>
    </Card>
  );
};
