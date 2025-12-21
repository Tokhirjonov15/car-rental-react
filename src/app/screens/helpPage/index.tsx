import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import { termsContent } from '../../../lib/data/terms';
import { faq } from '../../../lib/data/faq';
import '../../../css/help.css';

export default function HelpPage() {
  return (
     <Container maxWidth="lg" className="help-page">
      <Stack spacing={4}>
        <Box className="page-header">
          <Typography variant="h3" className="page-title">
            Help Center
          </Typography>
          <Typography variant="body1" className="page-subtitle">
            Find answers to common questions and learn more about our services
          </Typography>
        </Box>

        <Box className="help-section">
          <Stack direction="row" spacing={2} alignItems="center" className="section-header">
            <HelpOutlineIcon className="section-icon" />
            <Typography variant="h4" className="section-title">
              Frequently Asked Questions
            </Typography>
          </Stack>

          <Box className="accordion-container">
            {faq.map((faq, index) => (
              <Accordion key={index} className="faq-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="accordion-summary"
                >
                  <Typography className="faq-question">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                  <Typography className="faq-answer">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

        <Divider className="section-divider" />
        <Box className="help-section">
          <Stack direction="row" spacing={2} alignItems="center" className="section-header">
            <DescriptionIcon className="section-icon" />
            <Typography variant="h4" className="section-title">
              Terms & Conditions
            </Typography>
          </Stack>

          <Box className="accordion-container">
            {termsContent.map((term, index) => (
              <Accordion key={index} className="terms-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="accordion-summary"
                >
                  <Typography className="terms-title">
                    {term.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                  <Typography className="terms-content">
                    {term.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}