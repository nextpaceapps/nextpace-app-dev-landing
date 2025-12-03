# Quickstart Guide: TechOctagon PNG Images

## Overview

This guide provides step-by-step instructions for testing and verifying the TechOctagon PNG images feature.

## Prerequisites

- Development server running (`npm run dev`)
- Browser with DevTools enabled
- PNG images present in `theme/images/` folder

## Test Scenarios

### Scenario 1: Verify PNG Images Display

**Steps**:
1. Navigate to the Services page (`/#services` or scroll to Technology Stack section)
2. Observe all TechOctagon components
3. Verify each displays a PNG logo instead of SVG/text

**Expected Result**:
- All technology logos appear as PNG images
- Images are crisp and clear
- No broken image icons visible

**Acceptance Criteria**: SC-001 - All technology logos display as PNG images (100% replacement)

---

### Scenario 2: Verify Consistent Sizing

**Steps**:
1. View the Technology Stack section
2. Visually compare all TechOctagon logos side-by-side
3. Use browser DevTools to inspect image dimensions

**Expected Result**:
- All logos appear uniform in size
- No logo appears noticeably larger or smaller than others
- Container dimensions are consistent (6rem × 6rem)

**Acceptance Criteria**: SC-002 - Visual inspection confirms uniform sizing (within 5% variance)

---

### Scenario 3: Verify Aspect Ratio Preservation

**Steps**:
1. Inspect logos with different original aspect ratios (wide vs tall)
2. Verify no distortion or stretching

**Expected Result**:
- Logos maintain their original proportions
- No squashing or stretching visible
- CSS `object-fit: contain` working correctly

**Acceptance Criteria**: SC-003 - Logos maintain aspect ratios without visible distortion

---

### Scenario 4: Test Missing Image Fallback

**Steps**:
1. Temporarily rename or remove a PNG file from `theme/images/` folder (e.g., `gcloud.png`)
2. Refresh the page
3. Observe the TechOctagon component for that technology

**Expected Result**:
- Animated cube appears inside the octagon
- Cube uses default colors (cyan/fuchsia mix)
- Cube animates continuously (rotating)
- No broken image icon visible

**Acceptance Criteria**: FR-008 - Animated cube displays when image is missing

---

### Scenario 5: Test Image Loading Error Fallback

**Steps**:
1. Use browser DevTools Network tab
2. Block requests to PNG files (or simulate network error)
3. Refresh the page
4. Observe TechOctagon components

**Expected Result**:
- Animated cube appears immediately when image fails to load
- No retry attempts
- Smooth fallback transition

**Acceptance Criteria**: Clarification Q3 - Immediate fallback on loading error

---

### Scenario 6: Verify High-DPI Display Support

**Steps**:
1. Use a retina/high-DPI display (or browser zoom at 200%)
2. Inspect image quality
3. Verify images remain crisp

**Expected Result**:
- Images render clearly at 2x pixel density
- No pixelation or blurriness
- Appropriate image resolution used

**Acceptance Criteria**: SC-004 - Logos render clearly on displays with pixel density up to 2x

---

### Scenario 7: Performance Test

**Steps**:
1. Open browser DevTools Network tab
2. Reload the Services page
3. Measure image load times

**Expected Result**:
- All images load within 1 second on standard broadband connection
- No significant performance degradation
- Smooth page rendering

**Acceptance Criteria**: SC-005 - Page load performance remains acceptable

---

### Scenario 8: Verify Transparent Background Handling

**Steps**:
1. Inspect logos with transparent backgrounds
2. Verify they display correctly against octagon background

**Expected Result**:
- Transparent areas show octagon background/fill
- No white boxes or artifacts
- Proper alpha channel handling

**Acceptance Criteria**: FR-005 - PNG images with transparent backgrounds handled appropriately

---

## Manual Testing Checklist

- [ ] All TechOctagon components display PNG images
- [ ] Images are consistently sized
- [ ] Aspect ratios preserved (no distortion)
- [ ] Missing image shows animated cube fallback
- [ ] Loading error shows animated cube fallback
- [ ] Animated cube uses default colors (cyan/fuchsia)
- [ ] High-DPI displays show crisp images
- [ ] Page load performance acceptable (<1s)
- [ ] Transparent backgrounds handled correctly
- [ ] Hover effects still work (scale animation)

## Browser Compatibility

Test on:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

**Issue**: Images not displaying
- Check file paths match `TECH_IMAGE_MAP` configuration
- Verify PNG files exist in `theme/images/` folder
- Check browser console for import errors

**Issue**: Inconsistent sizing
- Verify CSS `object-fit: contain` is applied
- Check container dimensions are fixed (6rem × 6rem)
- Inspect computed styles in DevTools

**Issue**: Fallback not appearing
- Verify `onError` handler is attached to `<img>` element
- Check component state management
- Ensure animated cube component is imported and rendered

