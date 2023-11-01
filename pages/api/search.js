import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
  try {
    const { data } = await client.query({
      query: gql`
        query AllBlogs {
          blogs(where: { offsetPagination: { size: 3, offset: 0 } }) {
            nodes {
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
              title
              uri
              blogFeatures {
                title
              }
            }
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
      `,
    });
    return res.status(200).json({
      total: data.blogs.pageInfo,
      blogs: data.blogs.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

export default handler;
