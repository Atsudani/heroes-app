// import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";
import { useMemo } from "react";
import { getSummaryAction } from "@/heroes/actions/get-summary.action";
// import { SearchControls } from "../search/ui/SearchControls";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";

  const selectedTab = useMemo(() => {
    const validateTabs = ["all", "favorites", "heroes", "villains"];

    return validateTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  // para peticiones http mejor usar tanstack query!!! jijijiji
  // useEffect(() => {
  //   getHeroesByPage().then();
  // }, []);

  const { data: heroesResponse } = useQuery({
    queryKey: ["heroes", { page, limit }],
    queryFn: () => getHeroesByPageAction(+page, +limit),
    staleTime: 1000 * 60 * 5, //5 minutos cacheado jiji
  });

  const { data: summary } = useQuery({
    queryKey: ["summary-information"],
    queryFn: getSummaryAction,
    staleTime: 1000 * 60 * 5,
  });

  // console.log({ heroesResponse });

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Control de Entregas de Semillas"
          description="Descubre, explora y administra super héroes y villanos"
        />

        {/* Breadcrumb */}
        <CustomBreadcrumbs currentPage="Super Héroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  return prev;
                });
              }}
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");
                  return prev;
                });
              }}
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  return prev;
                });
              }}
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  return prev;
                });
              }}
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          {/* TabsContent */}

          {/* All */}
          <TabsContent value="all">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          {/* Favorites */}
          <TabsContent value="favorites">
            <HeroGrid heroes={[]} />
          </TabsContent>
          {/* Heroes */}
          <TabsContent value="heroes">
            <HeroGrid heroes={[]} />
          </TabsContent>
          {/* Villains */}
          <TabsContent value="villains">
            <HeroGrid heroes={[]} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      </>
    </>
  );
};
