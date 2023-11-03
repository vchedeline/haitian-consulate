import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const filters = await request.json();

    const response = await fetch(process.env.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
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
              databaseId
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
      }),
    });

    const { data } = await response.json();

    return NextResponse.json({
      total: data.blogs.pageInfo.offsetPagination.total,
      blogs: data.blogs.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
}
