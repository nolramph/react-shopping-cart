import React from 'react'

export default function Filter(props) {
    return (
        <div className="filter">
             <div className="filter-result">{props.count} Products</div>
             <div className="filter-sort">
                 Order {" "}
                  <select value={props.sort} onChange={props.sortProducts}>
                      <option value="latest">Latest</option>
                      <option value="lowest">Lowest</option>
                      <option value="highest">Highest</option>
                  </select>
             </div>
             <div className="filter-size">
                 Filter {" "}
                 <select value={props.size} onChange={props.filterProducts}>
                     <option value="">ALL</option>
                     <option value="XS">XS</option>
                     <option value="S">S</option>
                     <option value="M">M</option>
                     <option value="L">L</option>
                     <option value="XL">XL</option>
                 </select>
             </div>
        </div>
    )
}

