import { FC, useMemo } from "react"

import { IPagination } from "./Pagination.interface"

import { Base, Button } from "./Pagination.styles"
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

const DOTS = "isDots"

const Pagination: FC<IPagination> = ({ pageSize, currentPage, total, siblingCount = 1, onChange }) => {
    const range = (start: any, end: any) => {
        const length = end - start + 1
        /*
          Create an array of certain length and set the elements within it from
          start value to end value.
        */
        return Array.from({ length }, (_, idx) => idx + start)
    }

    const paginationRange = useMemo(() => {
        const totalPageCount = total

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5

        /*
          Case 1:
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount)
        }

        /*
            Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
        */
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        )

        /*
          We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
        */
        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        /*
            Case 2: No left dots to show, but rights dots to be shown
        */
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount
            const leftRange = range(1, leftItemCount)

            return [...leftRange, DOTS, totalPageCount]
        }

        /*
            Case 3: No right dots to show, but left dots to be shown
        */
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount
            const rightRange = range(totalPageCount - rightItemCount, totalPageCount)
            return [firstPageIndex, DOTS, ...rightRange]
        }

        /*
            Case 4: Both left and right dots to be shown
        */
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }
    }, [total, pageSize, siblingCount, currentPage])

    const paginationActions = {
        prev: () => currentPage !== 1 && onChange(currentPage - 1),
        next: () =>
            currentPage !== total && onChange(currentPage + 1),
        setPage: (page: number) => onChange(page)
    }

    return <Base>
        <Button onClick={paginationActions.prev}>
            <MdKeyboardArrowLeft />
        </Button>
        {paginationRange?.map((pageNumber) => {
            // If the pageItem is a DOT, render the DOTS unicode character
            if (pageNumber === DOTS) {
                return (
                    <Button
                        key={`pagination_button_${pageNumber}`}
                    >
                        &#8230;
                    </Button>
                )
            }

            // Render our Page Pills
            return (
                <Button
                    key={`pagination_button_${pageNumber}`}
                    isActive={pageNumber === currentPage}
                    onClick={() => {
                        paginationActions.setPage(pageNumber)
                    }}
                >
                    {pageNumber}
                </Button>
            )
        })}
        <Button onClick={paginationActions.next}>
            <MdKeyboardArrowRight />
        </Button>
    </Base>
}

export default Pagination