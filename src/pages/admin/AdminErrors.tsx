import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

interface ErrorRow {
  id: string;
  user_id: string | null;
  message: string;
  stack: string | null;
  route: string | null;
  user_agent: string | null;
  created_at: string;
}

const AdminErrors = () => {
  const [rows, setRows] = useState<ErrorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("client_errors")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) toast.error(error.message);
    setRows((data ?? []) as ErrorRow[]);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl tracking-wider">Error Logs</h1>
          <p className="text-sm text-muted-foreground">Most recent 200 client-side errors</p>
        </div>
        <Button onClick={load} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {!loading && rows.length === 0 && (
        <Card className="p-8 text-center text-sm text-muted-foreground">No errors logged. Nice.</Card>
      )}

      <div className="space-y-2">
        {rows.map((r) => {
          const isOpen = expanded === r.id;
          return (
            <Card key={r.id} className="p-4">
              <button
                className="w-full text-left"
                onClick={() => setExpanded(isOpen ? null : r.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm break-words">{r.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(r.created_at).toLocaleString()}
                      {r.route && <> · <span className="font-mono">{r.route}</span></>}
                      {r.user_id && <> · user {r.user_id.slice(0, 8)}…</>}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{isOpen ? "Hide" : "Show"}</span>
                </div>
              </button>
              {isOpen && (
                <div className="mt-3 space-y-2 text-xs">
                  {r.stack && (
                    <pre className="bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap break-all">{r.stack}</pre>
                  )}
                  {r.user_agent && (
                    <p className="text-muted-foreground break-all"><span className="font-medium">UA:</span> {r.user_agent}</p>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminErrors;
