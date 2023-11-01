import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { theme } from "theme";
import { Columns } from "components/Columns";
import { Column } from "components/Column";
import Image from "next/image";

export const BlockRenderer = ({blocks}) => {
  return blocks.map(block => {
    switch(block.name){
      case 'core/heading': {
        return <Heading   key={block.id}
        level={block.attributes.level}
        content={block.attributes.content}
        textAlign={block.attributes.textAlign}/>
      }
      
      case 'core/cover': {
        return <Cover key={block.id} background={block.attributes.url}>
          <BlockRenderer blocks={block.innerBlocks} />
        </Cover>
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
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        );
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
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }
      
      case "core/image": {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            height={block.attributes.height}
            width={block.attributes.width}
            alt={block.attributes.alt || ""}
          />
        );
      }

      case 'core/paragraph': {
        return <Paragraph 
                  key={block.id} 
                  textAlign={block.attributes.align} 
                  content={block.attributes.content}
                  textColor={theme[block.attributes.textColor] || 
                  block.attributes.style?.color?.text
                }
                  />
      }

      case "core/group":
        case "core/block": {
          return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
        }
        
      default:
        return null;
    }
  })
}