export function getCategoryTreeByRootIdQuery(rootId: number) {
  return `WITH RECURSIVE ct_categories AS (
        select 
             id,
             name,
             parent_id,
             1 node_level
        from categories
        where id=${rootId}
      union
        select 
            c.id,
            c.name,
            c.parent_id,
            node_level+1
        from categories as c
        join  ct_categories as cp on cp.id = c.parent_id	
    )
    
    SELECT * FROM ct_categories order by node_level;`;
}
