import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query FormQuery($id: String!){
		markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
				intro
				slug
				outro
				fields {
					label
					type
				}
      }
    }
  }
`
const AboutPage = ({ data }) => {
	const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, excerpt } = markdownRemark

	return (
		<Layout className="page">
			<SEO
				title={frontmatter.title}
				description={excerpt}
			/>
			<div className="wrapper">
				<h1>{frontmatter.title}</h1>
				<div dangerouslySetInnerHTML={{ __html: frontmatter.intro }} />
				<form netlify name="field" method="POST">
				{
					frontmatter.fields.map(field => {
						if(field.type === 'textArea'){
							return <div>{field.label}: <textarea name={field.label}/></div>
						} else {
							return <div>{field.label}: <input type={field.type} name={field.label}/></div>
						}
					})
				}
				<input type="submit"/>
				</form>
				<div dangerouslySetInnerHTML={{ __html: frontmatter.outro }} />
			</div>
		</Layout>
	)
}

export default AboutPage