import React, { useState } from "react"
import { Link, useStaticQuery } from "gatsby"
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const query = graphql`
query pageTitles {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          slug
        }
      }
    }
  }
}`

const ListLink = (props) => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>)


const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const siteData = useStaticQuery(query)
  const { edges } = siteData.allMarkdownRemark;

  const handleToggleClick = () => {
    setShowMenu(!showMenu)    
  }

  const listMenuItems = edges.map((menuItem, index) => 
    <ListLink 
      key={index} 
      to={menuItem.node.frontmatter.slug}
    >
      {menuItem.node.frontmatter.title}
    </ListLink>
  )

  return(
      <nav className="site-navigation">
        <button 
          onClick={handleToggleClick} 
          className={"menu-trigger" + (showMenu ? " is-active" : "")}
        >
          <div className="icon-menu-line"><RiMenu3Line/></div>
          <div className="icon-menu-close"><RiCloseLine/></div>
        </button>
        <ul>
          {listMenuItems}
        </ul>
      </nav>
  )
}

export default Navigation
