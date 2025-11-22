import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
  }) => void;
};

export default function LpCreateModal({ open, onClose, onSubmit }: Props) {
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [published, setPublished] = useState(true);

  // 열릴 때마다 폼 초기화
  useEffect(() => {
    if (open) {
      setTitle("");
      setContent("");
      setThumbnail("");
      setTagsInput("");
      setTags([]);
      setPublished(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, title, content, thumbnail, tags, published]);

  if (!open) return null;

  const addTag = () => {
    const t = tagsInput.trim();
    if (!t || tags.includes(t)) return;
    setTags((prev) => [...prev, t]);
    setTagsInput("");
  };

  const removeTag = (t: string) =>
    setTags((prev) => prev.filter((x) => x !== t));

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !thumbnail.trim()) return;
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      thumbnail: thumbnail.trim(),
      tags,
      published,
    });
  };

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={onBackdrop}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
      aria-modal="true"
    >
      <div className="relative w-[92vw] max-w-[380px] rounded-2xl bg-[#eaeaea] text-black">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-black/60 hover:text-black cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="px-6 pt-8 pb-6">
          <div className="w-full flex items-center justify-center mb-6">
            <div className="w-36 h-36 rounded-full overflow-hidden">
              <img
                src={
                  thumbnail.trim()
                    ? thumbnail
                    : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMVFhUXFxgXGBcVGBgXHRcYGBgWFhsVFxoYHSggGBslGxcXIjEjJSkrLi4uGR8zODMsNygtLisBCgoKDQ0NDg0NDisZFRkrLSs3NystKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAgMEBQYHCAH/xABGEAABAgMEBgcFBQYEBwEAAAABAAIDBBEhMUFRBQYSYXGBBxMiMpGh8BRCscHRUmKCkvEIFSNyouEzU2ODJENzk7LCwzT/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwDeKhRbyjrDmpDGAgEhAS13NImsOa8jGhoLF7A7Va2oES/eUmJceBTcZoAqLE0x5JAJQNqcEhzGgVNABeSsR1k14gSjal4JIqKk9oWWsaO1FvvFG5vCDJo15VJpDXSTlmOLoofQmoh0cARgXkhjTuc4LSes/SVMzJLYVQ2veeGmzdCA6tv4+scMHLB5qK+I7aivc8/eJNNwyG4Kjcunum1l0vBByLiXn8rS1vg88FhOlelfSMX/AA4xhD/TZDHxaXD8ywlwCaeguJvW6eiWxJyZd/uvApwaQFVxNIxXd6LEPF7j8SopK8RElk/FF0WIOD3D5qdLa0z0M1ZOTDeEV9PAlVCEGa6O6VtLQT/+oxB9mKxj686bXmst0V08RrBNyrHj7UFxYfyuqD4hadQg6f1b6UdGTTmjr+oefcmAIeYsdUsP5lngeHNqCCCLCLQVxIr3VvXCdkD/AMNHc1tamGe2w7ix1QK5ih3qK6yU1lw4LUep3TTLRyIc9DEu82da3tQibL8YfOosvC2fCmQ8BzHhzHWtc0ggjAgiwhA5H7xTkrcUqE0EVNpSI1l1iBU1dzTMHvBLgmpttTkRgAqBagcKgpYiHNSeqGQQQ0KZ1QyCECfZxvTbopFgwXvtO7zR1O1bW9B6xu1aV4/sXY5o29iy/FHf3U5oPGP2rCoGntLwJNnWRXUvLW1FXU40AAxJIAxKqNc9b4Ojm2kOjEdlltgNaOdTCywWE23AEjRc9NTOlIznvc7ZvJJqBS4ZWYAAAVNBUmoZJrb0oR5lxhywoK30qAbqNa4DbNfeeKZMHeNHJaFMbaiTMRz4htIcSSTm43kryDINg2NHMqRAmSDVp4k1pyCox/SsvsEgCnl4Kncsv0xLgjbvNLzTywCxOOKGg+iIjPKZeU69NOQMlCEIBCEIBCEIBCEIBZNqbrzN6Nd/Cftwie1AeSWEVqdn7Dr7RzqsZQg6v1K17ltIw6wHbMRo7cF/fbvH22/eHOiyhg278MlxfITsSBEbFgvdDiMNWvaaEH1guiui/pPhzwEvMAMm6WUsbGoLSzJ1lS3wxAitjPbs2jhaktiF1hxXu1t2XYo6rZtrWiBXUDem/aDuSvaNyPZt/kgT7QdyEr2bf5IQI6gp1sUAUOCc6wZjxUaI0kmgQKe3aNQsS6QddG6Mg0bsvmYoPVMNwpfFiUtDB5mzMi31o1jhaOlHzEbCxjMYjz3WDifAAnBc4tMfSc2+PHdVz3VecGtF0NuTQKCnzKC00PoePpSK6LGe7ZrV8R17iaWNG/5YAWZhNSbIDAxjdljRZZa7DmcK8hkjRM4ILBCHZY2yzE2WWYmy624BStIPEQ7VAKCymFLK8RdZdvxoxefl9q8fh+ufD44VEZ1Dv+HHJX80OQzxPDIX2+hVTkuLxduQMyrmuBDvPDgFj2lpfZcrMxy02C7DwvySdNwdtofXDgB9UGLxEy5SYoUdxRDDkL1y8QCEIQCEIQCEIQCEIQCVDiFpDmktcCCCDQgi0EEXEFJQg6O6IekUTzfZ5kgTTG33COwU7YGDx7w5jEDZTogcKC8ri2Sm3wYjIsJxZEY4Oa5t7SLQV1L0b63s0lLNi2Niso2Mwe66neH3XXjmMFFZSIBTvXhKLxmFF6s5FBI68IUfqzkUIEqWxwDamwAXlLotedL2n/Z5V0Jpo+MC07odzvzXYWB9LkGrekfWZ2lJ2kIkwIZLIAFodg+P+Klm4DNWkhICBDDGX0q476W/McV70b6DaWOmYgv7LBS4AWuHkOYyVzpHRpFnNwHPsjnUV3HcqKYRbrrO7wz8z471KlZurrbhbjaQbjuz+t0SaaQaeeQ9fHcogdTldxQZHPQw4VF/C7L16GNzDq1BsGJ+n19B+FpE1oT2cfp6zT0yBEtFBu+FckGMTkDZ4YBJhRrC03nAKwmWbVWg3XuyOQzKqZhoh8TheTxQU89BIcfkoERXc8zbbteSp4jaIiKUJTwkoBCEIBCEIBCEIBCEIBCEIBZFqHrS/Rs2yO2phnsRmD34ZIr+IXjeN6x1CDsuUmGRGsiQ3BzHgOa4WhzSKgjkrNaZ/Z91r24b9HxT2oYMSDXFhPbZ+Fxrwcclteqip6FAqvUCutOa52170qdIaQIaSW7QaL+5ZS8XFtHbnRHreWu822Xk4rySKtLa1pZsuc8imIhteRvAXOugIjjEfGd3jXkXWkDIfRUbFgTbYLGsYKNhtAHEVtpvJJ8F46esO3bnyw5LHm6QqQD/ADHkbPW5Oe0VsrvPI2Dxp4FBfeztcL7SKuzJOA4W865qi0pK0NGj+wHrzTjJgtCTCn9oHavdccQMBuz5oK0n9EQpuhIrZ7xx3Ab/AIKbNS1e7aTY0eNvxJ4KrmG9WM7wN5t7R3IJ0zGBHYaNqljcGg/E/HzVHGlbKutNbznkMyly8UipNbbTz+Z9XIjP602Gy6gyyH1QVfWVNAOzju/vdd5qsm2bJtUzSmkQ3sw7Ti4Xfhz4qsgQHxnta1rnxHGjWtBc5xwAF5RDL31uSKLaWr3QpPRgHTDocs04O/iPp/K00GF7uWCzOW6B5ID+JMzTj9wwmCvAsciueqIXRMXoIkKdmYmwd7oTh4dUPisW090FTLKulY8OMPsRB1TuThVpPGiDT6FZaa0JHlH9VMwXwn3gPF4zaRY4cCVWogQhCAQhCAQhCAQhCC01X00+Sm4MywmsN4JA95lz2c21HNdgycSHFhsiMo5j2hzSMWuAIPgVxUuk+g/WAx9GthEgvl3GEa37B7UPlQlv4FFbI6oZITHtB3IQa26cdI0lQwVq4tZTLbLnlx/DBc3/AHVrfRsi5kJtRa608zZ63q96aNIEzMKED2dp7jy6uEBn3ocX8xVSNYRS0CgGOVFRHcbznZyFn18U11xBO+zwsHz8VJM6wttpUCp43ledQyyjhZQX7r0DMWeww+X6fFOtnATbj8FGjaPJJIINAPE1+g8VFiw3NFchZxQXMCOdqoNndHD3neNnJNmYbFc6y6xvrjbwAVMY5YwgHDZHE4+dUqXmaNt8sK3+AB8ED2kYVbG3XV+J9blTaSnzD7DLDSh3blYibDGOiHiAfBo4LG4cOJMRWsY0viRHBrWi9znGgHiUFpqdqrMaTmBBgDfEiO7sNt207fkLzwrTpzUvUmV0ZD2YDaxCO3GdTbfur7rfuizjelah6qQ9GSjYDKF57UV/24hFp4C4DIcVkagEIQgEIQgrtPaDgTsF0GZhtiMOBvabtppva4Zhc29JfR1E0Y8PYTElnmjIhvaf8uLQUByIsO65dRqFprRUKagRJeO3ahxG7Lh8CDgQaEHMIOLihXeuersTR83Eloluyasd9uGe4/iRfvByVIqgQhCAQhCAQhCAW0/2f9JbE9ElyaCPCs/nhHbH9Loi1YAsm6PJ/qNJScS4CMxpNfdiHqzyo6vJFdYezb0J/aQoOXekuc6zSL7a7Ipzc98b/wCqxt0Yp/WGLtTcRxNa7FvCGwKASqiSZk0PIef6pbJ12eX6qA56TtILOHpF4JtvP9vknBpV1nHyFvyVRtpJeguXaQDiA4WW/T5lEWOxwpUj1/bzVOX2r3rUEvS0arWtBzs4UACz3oA0AI08+YeKtlmVb/1IlWt8G7Z8CtZR3Vcugv2dIAEhMPpa6Zc3kyFCp5ucitroQhQCEKHpfSkGVgvjzDxDhMFXONTSpAFgqSSSAALTVBMQq/QWm5edhCPLRBEhkkbQBFovBDgC07iMVYIBCEINQ/tEaCD5eDONHahO6t5zhxLq8H0/MVz+utOlSVEXRM404Qi/nDIiDzaFyYRag8QghCqBC9DUrq0CEBO7AXrWoENapMk4tiMdiHBw4tO1ZzCQGp+RaOthjN7ByLgEHW372CFrL9/uz/qH0QorTmmRSO8HDZHgxqhkq01wYWT000i1saI3k11B5AKlc9VCyV4XevXNNEryqB3aSS9IQg9qvQ5JQg9qui/2d4oOjorcWzT/AAdDgkH4+C5zW5f2ddMhseYlXH/EYIrP5mdlw5tc0/hKK3yhCFAKq1n0BCn5aJLR9rYfS1po5paQ4OaSDaCBgrVCCh1L1UgaMl/Z4Be5peYjnRCCXPcGtJsAAFGtFAMM7VfIQgEIQgxnpLjBmip0k0BgPbzcNkDxIXJbBVy6J/aC0y2Fo9svXtTERtn3IRERx/MGDmtA6LhBznEi4V8T+qoYMNebFqt2SjTcc68rEl2jTWwg2fH0URVhq92FYOkHVNmX1r5+aRElXDDcgh7C9axS3SxF4SWwTlj9EDIapGjmVmIIziwudXtSWw1Zasy+1OQhkS7/ALbHxP8A1CDYn7p9VH0Xi2t+4uCFFc8dMEh1OlpnJ5bEG8PY2p/MHeCwhxW4f2iNHfx5aaAsfDdCcd7DtivEPd4LTpVQIQhAIQhAIQhAKy1c0vEk5mFMwu/CeHAfawc05BzSRzVagIOztA6YhTkvDmIDtqHEbUbjcWnJwNQRmFYLmHou6QXaMiGHFq+ViGr2i+G40/iszsvGNmIt6U0ZpGFMQ2xoERsSG4Va5pqD9DuvCipSEIQCEIQCRFihrS5xDWtBJJNAALSScBRexYgaC5xAaASSTQAC0kk3Bc/9L3SgJoOkpJ38C6LFFnW09xn+nmfe4XhiPSdrX+8550RlepYOqgg/YBJ26YFxqeFBgo8nKdXCtscbd4rYB4W04qq0VJEuDiOyPM5fVZHKRNs2myt583etyojCT2W5+vqT5LyWhlramypPg2zzNTzVzHl9ugYaVIAGQwPIW+CXMSw7lDb2R/KO98Kc0FXLTBFK4/D9KKTCm4ZoHMGfgKU8SE6+TBu4evgmGSRqdxp4X+tyCW2DCd6wTcLRbSK8T4mqZMM142fL6lSA43Z9nhWz1wQNN0A6gNL7fG1TejXRu3pI1FWsaWni58OEf6XvP4SnX6RdDY51bgfpTxKyToNkS90WM68us/AHVPMx284ZQbi9oOQQj2c5oUGD9MWgTM6LinZ7UAiO38AIePyOceQXMS7aihrgWuoQQQRmDYQuQNdNBGRnY8sa0Y7sE+9Dd2mHf2SOYKCkQhCqBCEIBCEIBCEIBZBqnrlN6OftS0SgJq6G+rob/wCZtb94od6x9CDoPV7pzlogDZyC+A77UOsVh30HaHgeKzWR6QNGRgCyegW3BzurP5X0I8FyOiqiuvZnXnRsMVdPS44RGk8gDUrEtN9Nuj4TT7OIky7CjTCbzdEAIHBpXN9Upra4oMv1z6RZ3SVWvf1cH/JhVDSPvk2xDxs3BUGjNG7RBfY3zPD6puVDWkHFWx2jcezZd9VUWLWB/YaKUoAB8B68kRIXVilnyswr8/7L2Wjhos9cMvV6tpWB1gBe2h91ox3mt3PiUVDkS5naPeP9Lc/h5K2l47X2kAV7LRkN/wAfBV8eXNTiMTmRgNyXDrhf6sQT4kn2dpudB52fM8ChsuWih/XevdHTVSK3CwfW+36cVfbMNzamlgqfGlBvJsQY2ZYE3XDzNlPyn+pNRJE1G4V54eVfELIWyVB8aY1yHgPJOQtHn3rK9o22Ct3IDyAQYDrG/YYG528hit39EmjPZpFu1Y51/IuLq/7jog4ALTMKCZ7SDWQ7g8NbyIFu6tAd1SujJOUEKGyG0HZY0NFbzQUqd5v5oLDrm5/FCi7JyKFB4tW9PuqvWy8Ofhtq+CAyLTGETY673XHwcclt/YGQUGdgtiNfDeA5jw5jmm5zXAgtIyIJCDjFCyPX/VZ+jpt8E1MM9uC/7UMmwV+03uneN6xxVAhCEAhCEAhCEAhCEAhCEAlNKSgIJUJytpKLtNLcRdT5qlZ69BT5KNQin080FvKQww1da7yH19UormXjbVoJDcTcXbhk1VkWBUB1OXzp9U9JxiDb+nr5IrI4NIgAAtwGAyUeYkyCW3i2p+ITUB5sLSaYn6fVZHI7Lm0OWXkeaDH2sLeKkysWtMh8bueQ5qVPSdHEAZ7W7Icc8uN0fqiLBfgPKvBBe6On27VuGO/IcjfvGSa140u2DLFrT/FjdkUHumu0eFlMrHZqtZFaxpc40a0eN9tca/UrFJGXj6VnmQYZNXmlbSIUJveichYN5aEGwuhDQFGvnHi8lkOuJuc4cASK/fcDctyqFovRkOWgw4EJoDIbQ1o3DE5km0nMrzaOZUE5Cg7RzK9QK652aeZDBFTeUn2YZrwxqWUuQYp0lanM0lLGFY2Myr4Dz7rze0n7LqAHgDguWp2UfBiPhRWlkRji1zXXtcLCCu0QzbtuWtOl7o4E6z2mWH/FMFC27r2j3T98C44iw4UDnNC9ewtJDgQQSCCKEEWEEG4rxVAhCEAhCEAhCEAhCEAgIQEDzQpEIqOPVU9DQZPoWM14LDfSz1h6tR7OQ6h8PV6rtEx9l3NZFOMDmg1v8+Qtoin5GLh6ruVpKRSHVafxZcMz5BY9CZn4edu7crmTj1sxyy3nJBkknCD6C+vquPogYpmc0YWbR5uOGZAyA8vFL0S6ltbby6ywCt1e6N+Fc6lY9rhrcIoMtLHs3PeLNq2uy0ZWV5VsuAY9rPpgxndTCDi2obRoqXuNgaALybgP7rdvRhqV+7pYvige1RQDENh2BhBacheczwCx7on1BMANnpuHSKf8CE7/AJTSP8V3+oRcPdG+7agi7VmagQIxzT/UNy+KR7OM0n2k5IHepbl8UJr2g5IQL9oGRSDCJtGKR1Tsk+yIAKE2oEtfsWHyXju3dhmvIrdo1Fq9g9mtbEGsulPouE4HTUqGtmh3mWNbH44NifeuNxzXPUzLvhvcyI1zHtNHNcCC0jAg3LtSK4OFBaVhmvnR5A0m3aeOqjtFGx2gVpg2IPfb5jAoOWkK81r1SmtHRNiZZQHuxGVdDf8AyuoPAgHcqNVAhCEAhCEAhCEAhCEDzE41NMCehhBJlzQjDgsr0PEaRQ8Kn4bysRYVcaIibLgfNBfRoJBxaMzeeAwXsOKId5oMfWJTmk9MQmsFDtP+yD/5HAWKLoLVWc0i9p2S2GaGubTcWN+z991G302jYSmJ7TUWZPUwAQ00BIsJtAHKtOd1tFtDo76OWS2xMTbdqJY5jD7v3nA43EDC820Dch1M1Hl5ANcQHRh71pDScQSLXU9403BoNFlUYbV1qg9c7bsHG1JEIttOCIQ2TU2JyI8EUF6Dz2gb0j2c7kgQjkpPXNzQM+znchPdc3NeIF1USKLSkKZCuCBEvckzOCTM38kqVx5fNAmXvT8Q2HgkzPdUeHeOKCPPSUONDdDjQ2xIbhRzHioPI/Fam1x6DgaxNGxA3HqIriRwZEtPJ1eK3coBQcf6Z0LMSj+rmYL4TvvggGmLXXOG8EhQF2lMyEKPC6uNDZEYb2vaHA8itcay9C8hFJMu6JLONvZ/iMqT9h5qBuDgg50QtlaW6FdIQyTAMKYb913Vu5tfQeBKw/SWqE/LmkWTmG7+rc5v5mgt81UUqEqJDLTRwLTkQR8UkIBegL0NzTkOHU0bachafAIPWBOiz169BWuidU52YIEKWjH7xhRA382zQeKzXQvQ1ORCDFLYbcnOaDTgzbrw7PFBrjrAPVFkOhNVpyaIDIZYDaHPDhUZsY1pe8Ct7WkZkLdOgeieUlRtPPWPGIBbuscS54/C4cFmMnKshWQ2NaKiuyKV3uN7jvKVWv8AVLovhS9Hxu28W1eGm3cy1jbveMQ5bK2ZJyzIbaMAFbTiSc3E2k7ypCgvvPFQLjjtFOS1xS5fuj1impq8IFzN3NMwRaEuVv5J6N3SgUSoNEBT0ECi9U5CCApkK4IQgYmb+SVK48vmhCBcx3VHh3jihCCaoBXqEEuD3QmJm/l9UIQKlcU+65CEGIa4d08fmtEazd8/iXqFQ1ofvety3xql3WesUIQZXNYLyVvKEKB2P3T6xUVt4QhBOUF954r1CCTL90esU1NXhCEBK38k9G7pXiEEQKehCAQhCD//2Q=="
                }
                alt="thumbnail preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            className="w-full mb-3 rounded-md bg-white/5 border border-black/10 px-3 py-2 text-sm placeholder:text-black/40 outline-none"
          />

          {/* 내용 */}
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용"
            className="w-full mb-3 rounded-md bg-white/5 border border-black/10 px-3 py-2 text-sm placeholder:text-black/40 outline-none"
          />

          {/* 썸네일 URL */}
          <input
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="이미지 URL"
            className="w-full mb-3 rounded-md bg-white/5 border border-black/10 px-3 py-2 text-sm placeholder:text-black/40 outline-none"
          />

          {/* 태그 입력 */}
          <div className="flex items-center gap-2">
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="LP Tag"
              className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm placeholder:text-black/40 outline-none"
            />
            <button
              onClick={addTag}
              disabled={!tagsInput.trim()}
              className="px-3 py-2 text-sm rounded-md bg-black/20 hover:bg-black/30 disabled:opacity-40 cursor-pointer"
            >
              Add
            </button>
          </div>

          {/* 태그 리스트 */}
          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-black/10 px-2 py-1 text-[11px]"
                >
                  #{t}
                  <button
                    onClick={() => removeTag(t)}
                    className="text-black/60 hover:text-black cursor-poiter"
                    aria-label={`${t} 태그 제거`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* 공개 여부 */}
          <label className="mt-4 mb-2 flex items-center gap-2 text-xs text-black/80">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            공개(published)
          </label>

          {/* 제출 */}
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim() || !thumbnail.trim()}
            className="mt-4 w-full rounded-md bg-gray-300 py-3 text-sm font-semibold cursor-pointer"
          >
            Add LP
          </button>
        </div>
      </div>
    </div>
  );
}
