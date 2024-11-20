"use client";

import React from "react";
import Tree from "react-d3-tree";
import { TreeNode } from "@/types/tree";

interface CompanyTreeProps {
    companyData: TreeNode[];
  }
  
  const containerStyles: React.CSSProperties = {
    width: "100%",
    height: "500px",
  };
  
  const CompanyTree: React.FC<CompanyTreeProps> = ({ companyData }) => {
    return (
      <div style={containerStyles}>
        <Tree
          data={companyData}
          orientation="vertical"
          translate={{ x: 200, y: 100 }}
          pathFunc="step"
          nodeSize={{ x: 250, y: 150 }}
          renderCustomNodeElement={({ nodeDatum }: { nodeDatum: TreeNode }) => (
            <g>
              <circle r="15" fill="lightblue"></circle>
              <text x="20" y="5" fill="black" fontWeight="bold">
                {nodeDatum.name || "Unnamed Node"}
              </text>
              {nodeDatum.attributes &&
              Object.entries(nodeDatum.attributes || {}).map(([key, value], i) => (
                <text key={i} x="20" y={20 + i * 15} fill="gray">
                  {key.replace(/_/g, " ")}: {value || "N/A"}
                  </text>
                ))}
            </g>
          )}
        />
      </div>
    );
  };
  
  export default CompanyTree;