package tip.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class SortService {
    public static <T> void mergeSort(List<T> list, Comparator<T> comparator) {
        if (list == null || list.size() <= 1) return;

        int mid = list.size() / 2;
        List<T> left = new ArrayList<>(list.subList(0, mid));
        List<T> right = new ArrayList<>(list.subList(mid, list.size()));

        mergeSort(left, comparator);
        mergeSort(right, comparator);

        merge(list, left, right, comparator);
    }

    private static <T> void merge(List<T> list, List<T> left, List<T> right, Comparator<T> comparator) {
        list.clear();
        int i = 0, j = 0;

        while (i < left.size() && j < right.size()) {
            if (comparator.compare(left.get(i), right.get(j)) <= 0) {
                list.add(left.get(i++));
            } else {
                list.add(right.get(j++));
            }
        }

        while (i < left.size()) list.add(left.get(i++));
        while (j < right.size()) list.add(right.get(j++));
    }

    public static <T> void heapSort(List<T> list, Comparator<T> comparator) {
        int n = list.size();

        // Build heap (rearrange list)
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(list, n, i, comparator);
        }

        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            Collections.swap(list, 0, i);
            heapify(list, i, 0, comparator);
        }
    }

    private static <T> void heapify(List<T> list, int heapSize, int rootIndex, Comparator<T> comparator) {
        int largest = rootIndex;
        int left = 2 * rootIndex + 1;
        int right = 2 * rootIndex + 2;

        if (left < heapSize && comparator.compare(list.get(left), list.get(largest)) > 0) {
            largest = left;
        }

        if (right < heapSize && comparator.compare(list.get(right), list.get(largest)) > 0) {
            largest = right;
        }

        if (largest != rootIndex) {
            Collections.swap(list, rootIndex, largest);
            heapify(list, heapSize, largest, comparator);
        }
    }
}
