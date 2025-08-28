import { ChevronLeft, /*MoreHorizontal,*/ ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const page: number = 1;
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="sm" disabled={page === 1}>
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>

      {Array.from({ length: totalPages }).map((_, indice) => (
        <Button
          key={indice}
          variant={page === indice + 1 ? "default" : "outline"}
          size="sm"
        >
          {indice + 1}
        </Button>
      ))}

      {/* <Button variant="default" size="sm">
        1
      </Button>
      <Button variant="outline" size="sm">
        2
      </Button>
      <Button variant="outline" size="sm">
        3
      </Button> */}

      {/* <Button variant="ghost" size="sm" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button> */}

      <Button variant="outline" size="sm" disabled={page === totalPages}>
        Siguientes
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
