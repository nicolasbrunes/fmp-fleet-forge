import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-6xl font-bold text-primary mb-2">404</CardTitle>
            <CardDescription className="text-lg">
              Página não encontrada
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button asChild className="w-full gap-2">
            <a href="/">
              <Home className="w-4 h-4" />
              Voltar ao Sistema
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
