import { useMemo, useState } from 'react';
import { Check, Ruler, Footprints, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { sizeCharts } from '@/data/products';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

type Region = 'IND/UK' | 'US' | 'EU' | 'CM';

interface SizeGuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Product['category'];
  availableSizes: string[]; // product.sizes (always UK/IND values)
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

const FOOTWEAR_CATEGORIES: Product['category'][] = ['sneakers', 'shoes'];

const SizeGuideDialog = ({
  open,
  onOpenChange,
  category,
  availableSizes,
  selectedSize,
  onSelectSize,
}: SizeGuideDialogProps) => {
  const chart = sizeCharts[category];
  const isFootwear = FOOTWEAR_CATEGORIES.includes(category);

  // Parsed rows -> numeric cm for recommendation
  const rows = useMemo(() => {
    if (!isFootwear) return [];
    return chart.rows.map(r => ({
      uk: r[0],
      us: r[1],
      eu: r[2],
      cm: parseFloat(r[3]),
      raw: r,
    }));
  }, [chart, isFootwear]);

  const cmMin = rows.length ? Math.floor(rows[0].cm) : 22;
  const cmMax = rows.length ? Math.ceil(rows[rows.length - 1].cm + 0.5) : 30;

  const [region, setRegion] = useState<Region>('IND/UK');
  const [footCm, setFootCm] = useState<number>(() => {
    // initial guess: middle of chart, or matched to current selected size
    if (rows.length && selectedSize) {
      const matched = rows.find(r => r.uk === selectedSize);
      if (matched) return matched.cm;
    }
    return rows.length ? rows[Math.floor(rows.length / 2)].cm : 26;
  });

  // Recommend smallest row whose cm >= footCm (round up)
  const recommended = useMemo(() => {
    if (!rows.length) return null;
    const fit = rows.find(r => r.cm >= footCm) ?? rows[rows.length - 1];
    return fit;
  }, [rows, footCm]);

  const recommendedAvailable = recommended
    ? availableSizes.includes(recommended.uk)
    : false;

  const apply = (uk: string) => {
    onSelectSize(uk);
    onOpenChange(false);
  };

  const headerIndex = (label: Region) =>
    label === 'IND/UK' ? 0 : label === 'US' ? 1 : label === 'EU' ? 2 : 3;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl glass-panel border-white/10 bg-card text-foreground rounded-3xl p-0 overflow-hidden">
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl uppercase tracking-tight text-primary flex items-center gap-2">
              <Ruler className="w-6 h-6" />
              {chart.title}
            </DialogTitle>
            <DialogDescription className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {isFootwear
                ? 'Measure your foot, pick a region, and get a precise recommendation.'
                : 'Reference the chart below to find your fit.'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {isFootwear && (
            <>
              {/* How to measure */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 flex gap-3">
                <Footprints className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                    How to measure
                  </p>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    Place your heel against a wall, stand on paper, mark the longest
                    toe, then measure the distance in centimetres. Use the longer foot.
                  </p>
                </div>
              </div>

              {/* Foot length slider */}
              <div className="space-y-3">
                <div className="flex items-end justify-between">
                  <label className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Your foot length
                  </label>
                  <span className="font-display text-3xl text-[hsl(var(--primary-soft))] leading-none">
                    {footCm.toFixed(1)}
                    <span className="font-body text-xs text-muted-foreground ml-1 tracking-wider">
                      CM
                    </span>
                  </span>
                </div>
                <Slider
                  min={cmMin}
                  max={cmMax}
                  step={0.1}
                  value={[footCm]}
                  onValueChange={v => setFootCm(v[0])}
                  aria-label="Foot length in centimetres"
                />
                <div className="flex justify-between text-[10px] font-body uppercase tracking-widest text-muted-foreground">
                  <span>{cmMin} cm</span>
                  <span>{cmMax} cm</span>
                </div>
              </div>

              {/* Recommendation */}
              {recommended && (
                <div
                  className={cn(
                    'rounded-2xl p-5 border flex items-center justify-between gap-4',
                    recommendedAvailable
                      ? 'bg-primary/10 border-primary/40'
                      : 'bg-destructive/10 border-destructive/40',
                  )}
                >
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
                      Recommended size
                    </p>
                    <p className="font-display text-4xl uppercase text-foreground leading-none">
                      UK {recommended.uk}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-2">
                      US {recommended.us} · EU {recommended.eu} · {recommended.cm} cm
                    </p>
                    {!recommendedAvailable && (
                      <p className="font-body text-xs text-destructive mt-2 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        This size is out of stock for this product.
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => recommendedAvailable && apply(recommended.uk)}
                    disabled={!recommendedAvailable}
                    className="bg-primary text-primary-foreground font-body font-bold text-xs uppercase tracking-[0.2em] px-5 py-3 rounded-full hover:scale-[1.03] transition-transform disabled:opacity-40 disabled:cursor-not-allowed min-h-11 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Use Size
                  </button>
                </div>
              )}

              {/* Region tabs */}
              <Tabs value={region} onValueChange={v => setRegion(v as Region)}>
                <TabsList className="grid grid-cols-4 bg-white/[0.04] border border-white/10 rounded-full p-1 h-auto">
                  {(['IND/UK', 'US', 'EU', 'CM'] as Region[]).map(r => (
                    <TabsTrigger
                      key={r}
                      value={r}
                      className="rounded-full font-body text-[11px] uppercase tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2"
                    >
                      {r}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </>
          )}

          {/* Chart */}
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm font-body">
              <thead className="bg-white/[0.03]">
                <tr>
                  {chart.headers.map((h, i) => (
                    <th
                      key={h}
                      className={cn(
                        'py-3 px-4 text-left font-semibold uppercase tracking-wider text-[10px] text-muted-foreground',
                        isFootwear &&
                          i === headerIndex(region) &&
                          'text-primary',
                      )}
                    >
                      {h}
                    </th>
                  ))}
                  {isFootwear && (
                    <th className="py-3 px-4 text-right text-[10px] uppercase tracking-wider text-muted-foreground">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((row, i) => {
                  const ukValue = row[0];
                  const inStock = isFootwear ? availableSizes.includes(ukValue) : true;
                  const isRecommended =
                    isFootwear && recommended?.uk === ukValue;
                  const isSelected = isFootwear && selectedSize === ukValue;

                  return (
                    <tr
                      key={i}
                      className={cn(
                        'border-t border-white/5 transition-colors',
                        isRecommended && 'bg-primary/10',
                        isSelected && !isRecommended && 'bg-white/[0.04]',
                      )}
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={cn(
                            'py-3 px-4',
                            isFootwear && ci === headerIndex(region)
                              ? 'text-foreground font-semibold'
                              : 'text-muted-foreground',
                            !inStock && 'line-through opacity-50',
                          )}
                        >
                          {cell}
                          {isRecommended && ci === 0 && (
                            <span className="ml-2 text-[9px] uppercase tracking-widest text-primary font-bold">
                              Best fit
                            </span>
                          )}
                        </td>
                      ))}
                      {isFootwear && (
                        <td className="py-2 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => inStock && apply(ukValue)}
                            disabled={!inStock}
                            className={cn(
                              'text-[10px] font-body font-bold uppercase tracking-[0.2em] px-3 py-2 rounded-full transition-colors min-h-9',
                              isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-white/[0.05] border border-white/10 text-foreground hover:bg-primary hover:text-primary-foreground',
                              !inStock &&
                                'opacity-30 cursor-not-allowed hover:bg-white/[0.05] hover:text-foreground',
                            )}
                          >
                            {isSelected ? 'Selected' : inStock ? 'Pick' : 'N/A'}
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {isFootwear && (
            <p className="font-body text-[11px] text-muted-foreground leading-relaxed">
              Tip: if you're between two sizes, size up for everyday wear and size down
              for a snug, performance fit. Half sizes are not available — we round to
              the nearest full size.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideDialog;
