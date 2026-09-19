#!/usr/bin/env bash
#
# Post-deploy verification for the live portfolio site.
# Run after every deploy: ./verification/check_deploy.sh
# Optionally pass a different base URL: ./verification/check_deploy.sh https://example.com

set -u

base_url="${1:-https://varshasathiskumar.github.io}"
pass_count=0
fail_count=0

pass() {
  echo "[PASS] $1"
  pass_count=$((pass_count + 1))
}

fail() {
  echo "[FAIL] $1 -- $2"
  fail_count=$((fail_count + 1))
}

url_status() {
  curl -s -o /dev/null -w '%{http_code}' -L "$1"
}

echo "Checking deploy at: $base_url"
echo "---"

home_html="$(mktemp)"
trap 'rm -f "$home_html"' EXIT

home_status="$(curl -s -o "$home_html" -w '%{http_code}' -L "$base_url")"

# 1. Homepage reachable
if [ "$home_status" = "200" ]; then
  pass "Homepage reachable (HTTP 200)"
else
  fail "Homepage reachable" "got HTTP $home_status"
fi

# 2. Correct page served
if grep -q "<title>Portfolio</title>" "$home_html"; then
  pass "Correct page served (title tag found)"
else
  fail "Correct page served" "expected <title>Portfolio</title> not found"
fi

# 3. Required section anchors present
required_sections="about tech-stack experience impact-metrics projects resume contact"
missing_sections=""
for section_id in $required_sections; do
  if ! grep -q "id=\"$section_id\"" "$home_html"; then
    missing_sections="$missing_sections $section_id"
  fi
done
if [ -z "$missing_sections" ]; then
  pass "All section anchors present ($required_sections)"
else
  fail "All section anchors present" "missing:$missing_sections"
fi

# 4. Navbar mount point present
if grep -q 'id="navbar-root"' "$home_html"; then
  pass "Navbar mount point present"
else
  fail "Navbar mount point present" "id=\"navbar-root\" not found"
fi

# 5. Main JS bundle reachable
main_js_status="$(url_status "$base_url/src/main.js")"
if [ "$main_js_status" = "200" ]; then
  pass "Main JS bundle reachable (src/main.js)"
else
  fail "Main JS bundle reachable" "got HTTP $main_js_status"
fi

# 6. All linked stylesheets reachable
stylesheet_hrefs="$(grep -o 'rel="stylesheet"[^>]*href="[^"]*"' "$home_html" | grep -o 'href="[^"]*"' | sed 's/href="//;s/"$//')"
broken_stylesheets=""
for href in $stylesheet_hrefs; do
  case "$href" in
    http://*|https://*) full_url="$href" ;;
    *) full_url="$base_url/$href" ;;
  esac
  status="$(url_status "$full_url")"
  if [ "$status" != "200" ]; then
    broken_stylesheets="$broken_stylesheets $href($status)"
  fi
done
if [ -z "$broken_stylesheets" ]; then
  pass "All linked stylesheets reachable"
else
  fail "All linked stylesheets reachable" "broken:$broken_stylesheets"
fi

# 7. Resume PDF reachable with correct content type
resume_path="src/assets/resume/Portfolio_VarshaSathiskumar_Resume_.pdf"
resume_headers="$(curl -s -I -L "$base_url/$resume_path")"
resume_status="$(echo "$resume_headers" | head -n 1 | grep -o '[0-9][0-9][0-9]' | head -n 1)"
if [ "$resume_status" = "200" ] && echo "$resume_headers" | grep -qi "content-type: application/pdf"; then
  pass "Resume PDF reachable (application/pdf)"
else
  fail "Resume PDF reachable" "status=$resume_status, headers did not confirm application/pdf"
fi

# 8. Company logo images reachable
company_logos="figure.png kimberly-clark.png nitt.png nociquant.png"
broken_logos=""
for logo in $company_logos; do
  status="$(url_status "$base_url/src/assets/company-logos/$logo")"
  if [ "$status" != "200" ]; then
    broken_logos="$broken_logos $logo($status)"
  fi
done
if [ -z "$broken_logos" ]; then
  pass "All company logo images reachable"
else
  fail "All company logo images reachable" "broken:$broken_logos"
fi

# 9. Tech stack icons reachable
tech_icons="azure.svg csharp.svg css.svg docker.svg fastapi.svg html5.svg huggingface.svg javascript.svg kubernetes.svg langchain.png langgraph.png nodejs.svg postgresql.svg python.svg react.svg redis.svg typescript.svg"
broken_icons=""
for icon in $tech_icons; do
  status="$(url_status "$base_url/src/assets/tech-icons/$icon")"
  if [ "$status" != "200" ]; then
    broken_icons="$broken_icons $icon($status)"
  fi
done
if [ -z "$broken_icons" ]; then
  pass "All tech stack icons reachable"
else
  fail "All tech stack icons reachable" "broken:$broken_icons"
fi

# 10. No leftover placeholder content
if grep -iqE "lorem|placeholder|todo|xxxx" "$home_html"; then
  fail "No leftover placeholder content" "found placeholder-like text in homepage HTML"
else
  pass "No leftover placeholder content"
fi

echo "---"
echo "$pass_count/10 passed"

if [ "$fail_count" -gt 0 ]; then
  exit 1
fi
