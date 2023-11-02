import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
  try {
    const filters = JSON.parse(req.body);
    const { data } = await client.query({
      query: gql`
        query AllBlogs {
          blogs(where: { offsetPagination: { size: 3,  offset: ${
            ((filters.page || 1) - 1) * 3
          }} }) {
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
      total: data.blogs.pageInfo.offsetPagination.total,
      blogs: data.blogs.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

export default handler;
