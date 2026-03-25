-- like_count カラムを追加（存在しない場合のみ）
ALTER TABLE voice_posts ADD COLUMN IF NOT EXISTS like_count integer NOT NULL DEFAULT 0;

-- favorites INSERT 時に like_count をインクリメント
CREATE OR REPLACE FUNCTION public.increment_like_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE voice_posts
  SET like_count = like_count + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_favorite_added ON public.favorites;
CREATE TRIGGER on_favorite_added
  AFTER INSERT ON public.favorites
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_like_count();

-- favorites DELETE 時に like_count をデクリメント
CREATE OR REPLACE FUNCTION public.decrement_like_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE voice_posts
  SET like_count = GREATEST(like_count - 1, 0)
  WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS on_favorite_removed ON public.favorites;
CREATE TRIGGER on_favorite_removed
  AFTER DELETE ON public.favorites
  FOR EACH ROW
  EXECUTE FUNCTION public.decrement_like_count();

-- 既存データを正しい値に再集計
UPDATE voice_posts vp
SET like_count = (
  SELECT COUNT(*)
  FROM favorites f
  WHERE f.post_id = vp.id
);
