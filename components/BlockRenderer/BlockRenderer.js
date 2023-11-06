import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { theme } from "theme";
import { Columns } from "components/Columns";
import { Column } from "components/Column";
import { CallToActionButton } from "components/CallToActionButton";
import { BlogSearch } from "components/BlogSearch";
import { FormspreeForm } from "components/FormspreeForm";
import Image from "next/image";
import { List } from "components/List";
import { SubHeader } from "components/SubHeader";
import { Divider } from "components/Divider";
import { FooterHeader } from "components/FooterHeader";
import { useMemo } from "react";
import dynamic from "next/dynamic";

export const BlockRenderer = ({ blocks }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("../LeafletMap/LeafletMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return blocks.map((block) => {
    switch (block.name) {
      case "core/group":
      case "core/block": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }

      case "core/column": {
        return (
          <Column
            key={block.id}
            width={block.attributes.width}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
          >
            <BlockRenderer key={block.id} blocks={block.innerBlocks} />
          </Column>
        );
      }

      case "core/columns": {
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
          >
            <BlockRenderer key={block.id} blocks={block.innerBlocks} />
          </Columns>
        );
      }

      case "core/cover": {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer key={block.id} blocks={block.innerBlocks} />
          </Cover>
        );
      }

      case "core/post-title":
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
          />
        );
      }

      // case "core/gallery": {
      //   return (
      //     <Gallery
      //       key={block.id}
      //       columns={block.attributes.columns || 3}
      //       cropImages={block.attributes.imageCrop}
      //       items={block.innerBlocks}
      //     />
      //   );
      // }

      case "core/image": {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            height={block.attributes.height}
            width={block.attributes.width}
            alt={block.attributes.alt || ""}
            priority
            className="mx-auto"
          />
        );
      }

      case "core/list": {
        return <List key={block.id} listItems={block.innerBlocks} />;
      }

      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.align}
            content={block.attributes.content}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }

      case "core/separator": {
        return <Divider key={block.id} />;
      }

      /***************** ACF Cases *******************/

      case "acf/blogsearch": {
        return <BlogSearch key={block.id} />;
      }

      case "acf/ctabutton": {
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes.data.destination || "/"}
            align={block.attributes.data.align}
          />
        );
      }

      case "acf/foothead": {
        return (
          <FooterHeader key={block.id} image={block.attributes.data.image} />
        );
      }

      case "acf/formspreeform": {
        return (
          <FormspreeForm
            key={block.id}
            formId={block.attributes.data.form_id}
          />
        );
      }

      case "acf/leafmap": {
        return (
          <div className={`h-[450px] bg-black`}>
            <Map key={block.id} />
          </div>
        );
      }
      case "acf/subheader": {
        return (
          <SubHeader
            key={block.id}
            subImage={block.attributes.data.subheader_image}
            subTitle={block.attributes.data.subheader_title}
            align={block.attributes.data.align}
          />
        );
      }

      default:
        return null;
    }
  });
};
