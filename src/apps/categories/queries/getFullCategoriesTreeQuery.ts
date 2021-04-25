export function getFullCategoriesTreeQuery(): string {
  return `WITH RECURSIVE ct_categories AS (
        select 
             id,
             name,
             parent_id,
             1 node_level,
             id origin
        from categories
        where parent_id=0
      union
        select 
            c.id,
            c.name,
            c.parent_id,
            node_level+1,
            cp.origin
        from categories as c
        join  ct_categories as cp on cp.id = c.parent_id	
    )
    
    SELECT * FROM ct_categories order by origin`;
}
