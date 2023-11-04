import { gql } from "@apollo/client";
import client from "client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            blocks
            featuredImage {
              node {
                sourceUrl
              }
            }
            seo {
              metaDesc
              title
            }
          }
          ... on Blog {
            id
            title
            blocks
            seo {
              metaDesc
              title
            }
            blogFeatures {
              title
              content
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
        acfOptionsMainMenu {
          mainMenuPro {
            callToActionButton {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
            menuItems {
              menuItem {
                destination {
                  ... on Page {
                    uri
                  }
                  ... on Blog {
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ... on Page {
                    uri
                  }
                  ... on Blog {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });

  return {
    props: {
      seo: data.nodeByUri.seo,
      title: data.nodeByUri.title,
      blogFeatures: data.nodeByUri.blogFeatures || null,
      featuredImage: data.nodeByUri.featuredImage?.node?.sourceUrl || null,
      mainMenuItems: mapMainMenuItems(
        data.acfOptionsMainMenu.mainMenuPro.menuItems
      ),
      callToActionLabel:
        data.acfOptionsMainMenu.mainMenuPro.callToActionButton.label,
      callToActionDestination:
        data.acfOptionsMainMenu.mainMenuPro.callToActionButton.destination?.uri,
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
    },
  };
};
