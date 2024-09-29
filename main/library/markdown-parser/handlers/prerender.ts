/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { SitemapStream, streamToPromise } from 'sitemap';

import { writeFileSync } from 'fs';
import { Readable } from 'stream';

import { ResolvedArticle } from '../models/article';
import { getDirectoryPath } from '../utils/directory';

const { dist, distRoot } = getDirectoryPath();

export function processRoutes(articles: ResolvedArticle[]): void {
  const articleUrls = articles.map(item => `/blog/${item.id}`);
  const homeUrls = ['/', '/blog'];
  const content = [...homeUrls, ...articleUrls].join('\n');
  writeFileSync(`${dist}/routes.txt`, content);
  processSitemap(homeUrls, [...articleUrls]);
}

export function processSitemap(homeUrls: string[], innerUrls: string[]): void {
  const innerLinks = innerUrls.map(url => ({ url, changefreq: 'daily', priority: 0.5 }));
  const homeLinks = homeUrls.map(url => ({ url, changefreq: 'always', priority: 1 }));

  const sitemapStream = new SitemapStream({ hostname: 'https://paimon.apache.org/' });

  streamToPromise(Readable.from([...innerLinks, ...homeLinks]).pipe(sitemapStream) as Readable)
    .then(data => data.toString())
    .then(d => writeFileSync(`${distRoot}/sitemap.xml`, d));
}
