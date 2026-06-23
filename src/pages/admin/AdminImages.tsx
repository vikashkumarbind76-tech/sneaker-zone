import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Trash2, RefreshCw, Copy } from "lucide-react";

interface FileRow {
  name: string;
  url: string;
  size: number;
  created_at?: string;
}

const BUCKET = "product-images";

const AdminImages = () => {
  const [files, setFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from(BUCKET).list("", {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    const items = (data ?? []).filter((f) => f.name && !f.name.endsWith("/"));
    const signed = await Promise.all(
      items.map(async (f) => {
        const { data: s } = await supabase.storage.from(BUCKET).createSignedUrl(f.name, 3600);
        return {
          name: f.name,
          url: s?.signedUrl ?? "",
          size: (f.metadata as { size?: number } | null)?.size ?? 0,
          created_at: f.created_at,
        } as FileRow;
      })
    );
    setFiles(signed);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    for (const file of Array.from(fileList)) {
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error } = await supabase.storage.from(BUCKET).upload(safeName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });
      if (error) {
        toast.error(`${file.name}: ${error.message}`);
      } else {
        toast.success(`Uploaded ${file.name}`);
      }
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    void load();
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    const { error } = await supabase.storage.from(BUCKET).remove([name]);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Deleted");
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success("Signed URL copied (expires in 1h)");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl tracking-wider">Product Images</h1>
          <p className="text-sm text-muted-foreground">Bucket: <span className="font-mono">{BUCKET}</span> (private; signed URLs)</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={load} variant="outline" size="sm" disabled={loading || uploading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={() => inputRef.current?.click()} disabled={uploading}>
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading…" : "Upload"}
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>

      {!loading && files.length === 0 && (
        <Card className="p-8 text-center text-sm text-muted-foreground">No images yet. Upload to get started.</Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((f) => (
          <Card key={f.name} className="overflow-hidden flex flex-col">
            <div className="aspect-square bg-muted">
              {f.url && <img src={f.url} alt={f.name} className="w-full h-full object-cover" loading="lazy" />}
            </div>
            <div className="p-3 space-y-2 text-xs">
              <p className="font-mono break-all line-clamp-2">{f.name}</p>
              <p className="text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => copyUrl(f.url)}>
                  <Copy className="h-3 w-3 mr-1" /> URL
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(f.name)} aria-label={`Delete ${f.name}`}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminImages;
