"use client";

import limbusIds from "@/public/data/limbus-id";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [displayedSinners, setDisplayedSinners] = useState<
    Set<(typeof limbusIds)[0]>
  >(new Set());

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function sortSinners(sinners: typeof limbusIds) {
    const sortedNames = [
      "Yi Sang",
      "Faust",
      "Don Quixote",
      "Ryōshū",
      "Meursault",
      "Hong Lu",
      "Heathcliff",
      "Ishmael",
      "Rodion",
      "Sinclair",
      "Outis",
      "Gregor",
    ];
    return new Set(
      sinners.sort(
        (a, b) => sortedNames.indexOf(a.sinner) - sortedNames.indexOf(b.sinner)
      )
    );
  }

  const randomizeSinner = () => {
    // Shuffle the entire array first
    const shuffledIds = shuffleArray([...limbusIds]);

    // Select unique sinners from the shuffled array
    const uniqueSinners = Array.from(
      new Map(shuffledIds.map((item) => [item.sinner, item])).values()
    );

    // Sort the unique sinners
    const sortedUniqueSinners = sortSinners(uniqueSinners);

    setDisplayedSinners(sortedUniqueSinners);
  };

  return (
    <div className="h-screen w-screen bg-white text-black">
      <div className="w-full flex justify-center my-4">
        <Button onClick={randomizeSinner}>Randomize Sinners</Button>
      </div>
      <div className="grid grid-cols-2 gap-4 w-screen">
        <div className="flex flex-col">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Name</TableHead>
                <TableHead>Sinner</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...displayedSinners]
                .slice(0, displayedSinners.size / 2)
                .map((sinner, index) => (
                  <TableRow key={index}>
                    <TableCell>{sinner["id-name"]}</TableCell>
                    <TableCell>{sinner.sinner}</TableCell>
                    <TableCell>
                      <img
                        src={sinner["id-image-src"]}
                        height={20}
                        width={60}
                        alt={sinner.sinner}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Name</TableHead>
                <TableHead>Sinner</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...displayedSinners]
                .slice(displayedSinners.size / 2)
                .map((sinner, index) => (
                  <TableRow key={index}>
                    <TableCell>{sinner["id-name"]}</TableCell>
                    <TableCell>{sinner.sinner}</TableCell>
                    <TableCell>
                      <img
                        src={sinner["id-image-src"]}
                        height={20}
                        width={60}
                        alt={sinner.sinner}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
