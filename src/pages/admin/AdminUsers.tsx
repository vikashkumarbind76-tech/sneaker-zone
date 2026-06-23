import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { RefreshCw, Shield, ShieldOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface UserRow {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  isAdmin: boolean;
}

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from("profiles").select("id, display_name, avatar_url, created_at").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role").eq("role", "admin"),
    ]);
    if (profilesRes.error) toast.error(profilesRes.error.message);
    if (rolesRes.error) toast.error(rolesRes.error.message);
    const adminIds = new Set((rolesRes.data ?? []).map((r) => r.user_id));
    const merged: UserRow[] = (profilesRes.data ?? []).map((p) => ({
      id: p.id,
      display_name: p.display_name,
      avatar_url: p.avatar_url,
      created_at: p.created_at,
      isAdmin: adminIds.has(p.id),
    }));
    setRows(merged);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const toggleAdmin = async (row: UserRow) => {
    if (row.id === currentUser?.id && row.isAdmin) {
      if (!confirm("Remove admin from YOUR OWN account? You'll lose access to this panel.")) return;
    }
    setBusyId(row.id);
    if (row.isAdmin) {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", row.id).eq("role", "admin");
      if (error) toast.error(error.message);
      else {
        toast.success("Admin removed");
        setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, isAdmin: false } : r)));
      }
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: row.id, role: "admin" });
      if (error) toast.error(error.message);
      else {
        toast.success("Admin granted");
        setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, isAdmin: true } : r)));
      }
    }
    setBusyId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl tracking-wider">Users & Roles</h1>
          <p className="text-sm text-muted-foreground">Grant or revoke admin access</p>
        </div>
        <Button onClick={load} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {!loading && rows.length === 0 && (
        <Card className="p-8 text-center text-sm text-muted-foreground">No user profiles yet.</Card>
      )}

      <div className="space-y-2">
        {rows.map((r) => (
          <Card key={r.id} className="p-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                {r.avatar_url ? (
                  <img src={r.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-medium">{(r.display_name ?? "?").charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium truncate">{r.display_name ?? "(no name)"}</p>
                  {r.isAdmin && <Badge variant="default" className="bg-accent text-accent-foreground">admin</Badge>}
                  {r.id === currentUser?.id && <Badge variant="outline">you</Badge>}
                </div>
                <p className="text-xs text-muted-foreground font-mono truncate">{r.id}</p>
                <p className="text-xs text-muted-foreground">Joined {new Date(r.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <Button
              variant={r.isAdmin ? "outline" : "default"}
              size="sm"
              onClick={() => toggleAdmin(r)}
              disabled={busyId === r.id}
            >
              {r.isAdmin ? (
                <><ShieldOff className="h-4 w-4 mr-2" />Revoke admin</>
              ) : (
                <><Shield className="h-4 w-4 mr-2" />Make admin</>
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
